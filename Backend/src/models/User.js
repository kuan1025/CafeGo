const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, required: true }, 
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String }, 
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }, 
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('User', UserSchema);
  