const mongoose = require('mongoose');

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
    enum: ['Hot Beverage', 'Cold Beverage', 'Tea', 'Smoothies', 'Breakfast', 'Lunch', 'Sweets'], 
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
    label: { 
      type: String, 
      required: true 
    },
    additionalCost: { 
      type: Number, 
      default: 0 
    }
  }],
  milkOptions: [{
    type: String,
    enum: ['Regular', 'Oat Milk', 'Soy Milk'],
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExtraOption'
  }],
  flavors: [{
    name: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    } 
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

module.exports = mongoose.model('Product', ProductSchema);
