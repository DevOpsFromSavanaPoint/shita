import { Schema, model } from 'mongoose';

const dishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: { type: String }
}, { timestamps: true });

export const Dish = model('dish', dishSchema);
