import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v: string) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props: { value: any; }) => `${props.value} não é um número de telefone válido!`
    }
  },
  menu: [{
    type: Schema.Types.ObjectId,
    ref: 'MenuItem'
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

export const Restaurant = model('Restaurant', restaurantSchema);
