const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const Product = require('../models/product');
const Size = require('../models/size');
const ExtraOption = require('../models/extraOption');
const Flavor = require('../models/flavor');

exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    
    const newOrder = new Order({
      user: userId,
      orderDetails: [],  
      totalAmount: 0
    });
    await newOrder.save();

    let totalAmount = 0;
    let orderDetails = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });

      let itemPrice = product.basePrice;

      // Size + price
      let size = null;
      if (item.sizeId) {
        size = await Size.findById(item.sizeId);
        if (!size) return res.status(404).json({ message: `Size not found: ${item.sizeId}` });
        itemPrice += size.additionalCost;
      }

      // extra options
      let extras = [];
      if (item.extras) {
        for (const extraId of item.extras) {
          const extra = await ExtraOption.findById(extraId);
          if (!extra) return res.status(404).json({ message: `Extra not found: ${extraId}` });
          extras.push(extra._id);
          itemPrice += extra.price;
        }
      }

      // flavor
      let flavors = [];
      if (item.flavors) {
        for (const flavorId of item.flavors) {
          const flavor = await Flavor.findById(flavorId);
          if (!flavor) return res.status(404).json({ message: `Flavor not found: ${flavorId}` });
          flavors.push(flavor._id);
        }
      }

    
      const orderDetail = new OrderDetail({
        order: newOrder._id,  
        product: item.productId,
        size: size ? size._id : null,
        milkOption: item.milkOption || 'Regular',
        extras,
        flavors,
        quantity: item.quantity,
        itemPrice
      });

      await orderDetail.save();
      orderDetails.push(orderDetail._id);
      totalAmount += itemPrice * item.quantity;
    }

    newOrder.orderDetails = orderDetails;
    newOrder.totalAmount = totalAmount;
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate({
      path: 'orderDetails',
      populate: ['product', 'size', 'extras', 'flavors']
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate({
        path: 'orderDetails',
        populate: ['product', 'size', 'extras', 'flavors']
      });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    await OrderDetail.deleteMany({ order: req.params.id });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
