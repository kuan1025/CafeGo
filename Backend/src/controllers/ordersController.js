const Order = require('../models/order');  


exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, phoneNumber, email } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      phoneNumber,
      email,
      status: 'pending',
      createdAt: new Date()
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating order' });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').exec();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('userId').exec();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order' });
  }
};

// 更新訂單狀態
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating order' });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting order' });
  }
};
