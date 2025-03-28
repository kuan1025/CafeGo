const OrderDetail = require('../models/orderDetail');

//  Create a new OrderDetail
exports.createOrderDetail = async (req, res) => {
  try {
    const newOrderDetail = new OrderDetail(req.body);
    await newOrderDetail.save();
    res.status(201).json(newOrderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order detail', error });
  }
};

// Get all OrderDetails
exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.find().populate('order product size extras flavors');
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error });
  }
};

// Get a single OrderDetail by ID
exports.getOrderDetailById = async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findById(req.params.id).populate('order product size extras flavors');
    if (!orderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order detail', error });
  }
};

//  Update an OrderDetail
exports.updateOrderDetail = async (req, res) => {
  try {
    const updatedOrderDetail = await OrderDetail.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('order product size extras flavors');
    if (!updatedOrderDetail) {
      return res.status(404).json({ message: 'Order detail not found' });
    }
    res.status(200).json(updatedOrderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order detail', error });
  }
};

// Delete an OrderDetail
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
