import { Schema, model } from 'mongoose';

const deliveryPersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props: { value: any; }) => `${props.value} não é um e-mail válido!`
    }
  },
  password: {
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
  vehicle: {
    type: String,
    required: true,
    enum: ['Bike', 'Car', 'Motorcycle', 'Other']
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  currentLocation: {
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
  isWorking: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

deliveryPersonSchema.index({ currentLocation: '2dsphere' });

export const DeliveryPerson = model('DeliveryPerson', deliveryPersonSchema);
