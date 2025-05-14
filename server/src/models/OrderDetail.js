const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new mongoose.Schema({
  order: {
    type: Schema.ObjectId,
    ref: 'Order',
    required: true
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: { 
    type: String,
    required: true
  },
  basePrice: { 
    type: Number,
    required: true
  },
  size: {
    label: { type: String }, 
    price: { type: Number } 
  },
  milkOption: {
    name: { type: String },
    price: { type: Number }
  },
  extras: [{
    name: String,   
    label: String,  
    price: Number
  }],
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  itemPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
