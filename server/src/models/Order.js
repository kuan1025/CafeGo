const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  orderDetails: [{
    type: Schema.ObjectId,
    ref: 'OrderDetail' 
  }],
  // status: {
  //   type: String,
  //   enum: STATUS_ENUM,
  //   default: 'pending'
  // },
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

OrderSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('orderDetails')) {
    let total = 0;
    for (let detailId of this.orderDetails) {
      const detail = await mongoose.model('OrderDetail').findById(detailId);
      if (detail) {
        total += detail.itemPrice * detail.quantity;
      }
    }
    this.totalAmount = total;
  }
  next();
});



module.exports = mongoose.model('Order', OrderSchema);
