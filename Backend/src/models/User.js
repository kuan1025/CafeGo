const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true }, 
    email: { type: String, unique: true },
    phoneNum : {type: String, unique: true},
    name: { type: String, required: true },
    token: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }, 
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('User', UserSchema);
  