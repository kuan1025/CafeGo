const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {  STATUS_ENUM } = require('../enum/enums'); 


const OrderSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: STATUS_ENUM,
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
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

module.exports = mongoose.model('Order', OrderSchema);
