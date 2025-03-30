const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { MILK_OPTIONS_ENUM } = require('../enum/enums');

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
  size: {
    type: Schema.ObjectId,
    ref: 'Size',
    default: null 
  },
  milkOption: {
    type: String,
    enum: MILK_OPTIONS_ENUM,
    default: 'Regular'
  },
  extras: [{
    type: Schema.ObjectId,
    ref: 'ExtraOption'
  }],
  flavors: [{
    type: Schema.ObjectId,
    ref: 'Flavor'
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
