import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['paid', 'not_paid']
  },
  method: {
    type: String,
    required: true,
    enum: ['mpesa', 'emola', 'mkesh', 'netshop', 'paypal'],
  },
  transactionId: { type: String }
}, { timestamps: true });

export const Payment = model('payment', paymentSchema);
