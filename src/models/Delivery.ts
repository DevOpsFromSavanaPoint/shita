import { Schema, model } from 'mongoose';

const deliverySchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  deliveryPerson: {
    type: Schema.Types.ObjectId,
    ref: 'DeliveryPerson'
  },
  deliveryStatus: {
    type: String,
    enum: ['pending', 'in_progress', 'delivered', 'canceled'],
    default: 'pending'
  },
  deliveryStartedAt: Date,
  deliveryFinishedAt: Date,
  deliveryNotes: String
});

export const Delivery = model('Delivery', deliverySchema);
