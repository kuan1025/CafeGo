const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new mongoose.Schema({
    order: {
      type: Schema.ObjectId,
      ref: 'Order',
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'cash'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    paymentDate: {
      type: Date,
      default: Date.now
    }
  });
  
  const Payment = mongoose.model('Payment', PaymentSchema);