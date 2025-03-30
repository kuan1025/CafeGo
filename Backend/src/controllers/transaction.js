const Transaction = require('../models/transaction');
const Order = require('../models/order');
const { v4: uuidv4 } = require('uuid'); 
const axios = require('axios'); // call api

// create transaction
exports.createTransaction = async (req, res) => {
  try {
    const { orderId, paymentProvider, amount, currency } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const transaction = new Transaction({
      user: order.user,
      order: orderId,
      paymentProvider,
      providerTransactionId: uuidv4(), 
      amount,
      currency: currency || 'USD',
      status: 'pending'
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

// select transaction histroy
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('order user');
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error });
  }
};

// select users' transaction
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).populate('order');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

// update status (e.g fail, succeed）
exports.updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    transaction.status = status;
    transaction.updatedAt = Date.now();
    await transaction.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction status', error });
  }
};
