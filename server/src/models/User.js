const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    googleId: { type: String }, 
    email: { type: String, unique: true },
    name: { type: String, required: true },
    token: { type: String },
    password : {type : String},
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }], 
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('User', UserSchema);
  