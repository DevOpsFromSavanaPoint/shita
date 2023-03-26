import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Review = model('review', reviewSchema);
