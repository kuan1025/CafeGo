const RefundSchema = new mongoose.Schema({
    transaction: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true
    },
    providerRefundId: { //refund ID
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
    reason: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'processed', 'failed'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Refund', RefundSchema);
  