const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

// Create OrderDetail
exports.createOrderDetail = async (req, res) => {
  try {
    const { product: productId, size, milkOption, extras, quantity } = req.body;

    const product = await Product.findById(productId).populate('extras');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let itemPrice = product.basePrice;

    if (size.price) {
      itemPrice += size.price;
    }


    if (milkOption.price) {
      itemPrice += milkOption.price;
    }


    let parsedExtras = [];
    if (Array.isArray(extras)) {
      parsedExtras = extras.map(extra => {
        itemPrice += extra.price || 0;
        return {
          name: extra.name,
          label: extra.label,
          price: extra.price,
        };
      });
    }

    const newOrderDetail = new OrderDetail({
      product: product._id,
      productName: product.name,
      basePrice: product.basePrice,
      size,
      milkOption,
      extras: parsedExtras,
      quantity,
      itemPrice: itemPrice * quantity,
    });

    await newOrderDetail.save();
    res.status(201).json(newOrderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order detail', error });
  }
};

// Get all OrderDetails
exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.find().populate('order product');
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error });
  }
};

// Get single OrderDetail
exports.getOrderDetailById = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findById(req.params.id).populate('order product');
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order detail', error });
  }
};

// Update OrderDetail
exports.updateOrderDetail = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findById(req.params.id);
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }

    const {
      product: productId,
      size,
      milkOption,
      extras,
      quantity
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let itemPrice = product.basePrice;

    if (size?.price) itemPrice += size.price;
    if (milkOption?.price) itemPrice += milkOption.price;

    const parsedExtras = Array.isArray(extras)
      ? extras.map(extra => {
          itemPrice += extra.price || 0;
          return {
            name: extra.name,
            label: extra.label,
            price: extra.price,
          };
        })
      : [];

    orderDetail.product = product._id;
    orderDetail.productName = product.name;
    orderDetail.basePrice = product.basePrice;
    orderDetail.size = size;
    orderDetail.milkOption = milkOption;
    orderDetail.extras = parsedExtras;
    orderDetail.quantity = quantity;
    orderDetail.itemPrice = itemPrice * quantity;

    await orderDetail.save();
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order detail', error });
  }
};

// Delete OrderDetail
exports.deleteOrderDetail = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findByIdAndDelete(req.params.id);
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }
    res.status(200).json({ message: 'Order detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order detail', error });
  }
};
