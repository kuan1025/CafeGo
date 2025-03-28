const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExtraOptionSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    options: [{ 
      label: { 
        type: String, 
        required: true 
      },
      price: { 
        type: Number, 
        default: 0 
      } 
    }],
  });
  
  module.exports = mongoose.model('ExtraOption', ExtraOptionSchema);
  