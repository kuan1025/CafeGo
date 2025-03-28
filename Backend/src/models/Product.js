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
    type: Schema.ObjectId,
    ref: 'Size'
  }],
  milkOptions: [{
    type: String,
    enum: MILK_OPTIONS_ENUM,
    default: 'Regular'
  }],
  extraShot: {
    price: { 
      type: Number, 
      default: 1 
    },
    label: { 
      type: String, 
      default: 'Extra Shot' 
    }
  },
  extras: [{
    type: Schema.ObjectId,
    ref: 'ExtraOption'
  }],
  flavors: [{
    type: Schema.ObjectId,
    ref: 'Flavor'
  }],
  allowMilkOptions: {
    type: Boolean, 
    default: true
  },
  allowExtraShot: {
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
