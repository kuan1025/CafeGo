const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { CATEGORY_ENUM, MILK_OPTIONS_ENUM } = require('../enum/enums'); 

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  category: { 
    type: String, 
    enum: CATEGORY_ENUM, 
    required: true 
  },  
  basePrice: { 
    type: Number, 
    required: true 
  }, 
  imageUrl: { 
    type: String 
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  sizes: [{
    label: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  milkOptions: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
  }],
  extras: [{
    type: Schema.ObjectId,
    ref: 'ExtraOption'
  }],
  allowMilkOptions: {
    type: Boolean, 
    default: true
  }
});


ProductSchema.statics.getCategoryEnumValues = function() {
  return CATEGORY_ENUM;
};


ProductSchema.statics.getMilkOptionsEnumValues = function() {
  return MILK_OPTIONS_ENUM;
};


module.exports = mongoose.model('Product', ProductSchema);
