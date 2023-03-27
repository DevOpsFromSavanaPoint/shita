import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    displayName: {
        firstName: string;
        lastName: string;
    };
    email: string;
    password: string;
    address: {
        street?: string;
        number?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
    };
    phoneNumber?: string;
    phoneVerified: boolean;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: ICategory['_id'];
    image: string;
    createdAt: Date;
}


interface ICategory extends Document {
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}




export interface IOrder extends Document {
    user: IUser['_id'];
    items: {
        product: IProduct['_id'];
        quantity: number;
        price: number;
    }[];
    status: 'pending' | 'processing' | 'delivering' | 'completed' | 'cancelled';
    payment: {
        method: 'mpesa' | 'emola' | 'mkesh' | 'netshop' | 'paypal';
        status: 'pending' | 'approved' | 'declined';
        transaction_id?: string;
    };
    total_amount: number;
    created_at: Date;
}



export interface IDish extends Document {
    name: string;
    description?: string;
    category: Schema.Types.ObjectId;
    price: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
  }


export interface IMenu extends Document {
    name: string;
    description?: string;
    restaurant: IRestaurant['_id'];
    products: IProduct['_id'][];
    created_at: Date;
    updated_at: Date;
}



interface IRestaurant extends Document {
    name: string;
    description: string;
    location: {
        type: string;
        coordinates: number[];
    };
    address: string;
    phone: string;
    menu: Schema.Types.ObjectId[];
    rating?: number;
    reviews?: Schema.Types.ObjectId[];
}


export interface IPayment {
    order: Schema.Types.ObjectId;
    amount: number;
    status: 'paid' | 'not_paid';
    method: 'mpesa' | 'emola' | 'mkesh' | 'netshop' | 'paypal';
    transactionId?: string;
}


export interface IReview extends Document {
    user: Schema.Types.ObjectId;
    dish: Schema.Types.ObjectId;
    rating: number;
    comment?: string;
    createdAt: Date;
}


export interface IItem extends Document {
    product: Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }


  export interface DeliveryPerson {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    vehicle: 'Bike' | 'Car' | 'Motorcycle' | 'Other';
    licensePlate: string;
    currentLocation: {
      type: string;
      coordinates: [number, number];
    };
    isWorking: boolean;
    isAvailable: boolean;
    orders: string[];
  }



  export interface DeliveryData {
    order: string;
    deliveryPerson?: string;
    deliveryStatus: 'pending' | 'in_progress' | 'delivered' | 'canceled';
    deliveryStartedAt?: Date;
    deliveryFinishedAt?: Date;
    deliveryNotes?: string;
  }