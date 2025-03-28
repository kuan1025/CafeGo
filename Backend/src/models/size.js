const mongoose = require('mongoose');
const SizeSchema = new mongoose.Schema({
    label: {
      type: String,
      required: true
    },
    additionalCost: {
      type: Number,
      default: 0
    },
  });
  
  module.exports = mongoose.model('Size', SizeSchema);
