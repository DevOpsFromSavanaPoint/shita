import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    displayName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    address: {
        street: { type: String },
        number: { type: String },
        neighborhood: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zipCode: { type: String }
    },
    
    phoneNumber: { type: String },

    phoneVerified: {
        type: Boolean,
        default: false
      },

      emailVerified: {
        type: Boolean,
        default: false
      }
}, { timestamps: true});

export const User = model('User', userSchema);
