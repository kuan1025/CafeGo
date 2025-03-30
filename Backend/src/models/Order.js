const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { STATUS_ENUM } = require('../enum/enums');

const OrderSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  orderDetails: [{
    type: Schema.ObjectId,
    ref: 'OrderDetail' 
  }],
  status: {
    type: String,
    enum: STATUS_ENUM,
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
