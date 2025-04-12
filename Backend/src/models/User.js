const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    googleId: { type: String }, 
    email: { type: String, unique: true },
    name: { type: String, required: true },
    token: { type: String },
    password : {type : String},
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }, 
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('User', UserSchema);
  