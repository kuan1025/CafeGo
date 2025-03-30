const PaymentIntentSchema = new mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    provider: {
      type: String,
      enum: ['paypal', 'stripe'],
      required: true
    },
    providerIntentId: { 
      type: String,
      unique: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    status: {
      type: String,
      enum: ['created', 'pending', 'canceled', 'completed'],
      default: 'created'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('PaymentIntent', PaymentIntentSchema);
  