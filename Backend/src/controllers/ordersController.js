const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const Product = require('../models/product');
const ExtraOption = require('../models/extraOption');


exports.createOrder = async (req, res) => {
  try {
    const { user, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required.' });
    }

    let totalAmount = 0;
    const orderDetails = [];

    // create Order
    const newOrder = new Order({
      user,
      totalAmount: 0, 
    });
    await newOrder.save();

    for (const item of items) {
      const {
        productId,
        selectedSizeLabel,
        selectedMilkName,
        selectedExtras = [],
        quantity
      } = item;

      const product = await Product.findById(productId).populate('extras');
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      const size = product.sizes.find(s => s.label === selectedSizeLabel);
      if (!size) {
        return res.status(400).json({ message: `Size not found: ${selectedSizeLabel}` });
      }

      const milkOption = product.milkOptions.find(m => m.name === selectedMilkName);
      if (!milkOption && product.allowMilkOptions) {
        return res.status(400).json({ message: `Milk option not found: ${selectedMilkName}` });
      }

      const extrasInProduct = await ExtraOption.find({ _id: { $in: selectedExtras } });
      const extras = [];
      let extrasPrice = 0;
      for (const extra of extrasInProduct) {
        extras.push({
          name: extra.name,
          price: extra.price,
        });
        extrasPrice += extra.price;
      }

      const sizePrice = size.price || 0;
      const milkPrice = milkOption.price || 0;
      const basePrice = product.basePrice;
      const itemPrice = (basePrice + sizePrice + milkPrice + extrasPrice) * quantity;

      totalAmount += itemPrice;

      const orderDetail = new OrderDetail({
        order: newOrder._id,  
        product: product._id,
        productName: product.name,
        basePrice,
        size,
        milkOption,
        extras,
        quantity,
        itemPrice
      });

      console.log('Saving OrderDetail:', orderDetail);  
      await orderDetail.save();
      orderDetails.push(orderDetail._id);
    }

    // update
    newOrder.totalAmount = totalAmount;
    newOrder.orderDetails = orderDetails;
    await newOrder.save();

    res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);  // debug
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: 'orderDetails',
      populate: {
        path: 'product', 
        select: 'name price' 
      }
    }).populate('user');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: 'orderDetails',
      populate: {
        path: 'product',  
      }
    }).populate('user');  

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log("userId : "+ userId);
    const orders = await Order.find({ user: userId }).populate({
      path: 'orderDetails',
      populate: {
        path: 'product',  
      }
    }).populate('user');  

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: `No orders found for user: ${userId}` });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};



exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user orderDetails');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }


    await OrderDetail.deleteMany({ _id: { $in: order.orderDetails } });
    await order.deleteOne();

    res.status(200).json({ message: 'Order and details deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
