import { Schema, model } from 'mongoose';

const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

export const Menu = model('Menu', menuSchema);
