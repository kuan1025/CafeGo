const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  size: {
    type: String, 
  },
  extras: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExtraOption' 
  }],
  flavors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flavor' 
  }],
  specialInstructions: {
    type: String, 
  },
  price: {
    type: Number, 
    required: true
  }
});

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
