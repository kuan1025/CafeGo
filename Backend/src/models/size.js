const mongoose = require('mongoose');
const SizeSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  label: { type: String },                
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Size', SizeSchema);
