const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TRANSACTION_STATUS_ENUM = ['pending', 'completed', 'failed', 'refunded'];

const TransactionSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  paymentProvider: {
    type: String,
    enum: ['paypal', 'stripe', 'credit_card', 'apple_pay', 'google_pay'],
    required: true
  },
  providerTransactionId: { // third party ID
    type: String,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: TRANSACTION_STATUS_ENUM,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
