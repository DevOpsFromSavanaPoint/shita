import { Request, Response } from 'express';
import { Delivery } from '../models/delivery';
import { User } from '../models/user';

export async function notifyDelivery(request: Request, response: Response) {
  try {
    const delivery = await Delivery.findOne({ status: 'pending' });
    if (!delivery) {
      return response.status(404).json({ message: 'No pending delivery found.' });
    }

    const deliveryAddress = delivery.address;
    const deliveryUser = await User.findById(delivery.userId);

    const deliveryGuy = await User.findOne({ role: 'delivery', available: true });

    if (!deliveryGuy) {
      return response.status(404).json({ message: 'No delivery guy found.' });
    }

    // Send notification to delivery guy
    const notification = {
      title: 'New delivery available',
      body: `There is a new delivery to be made at ${deliveryAddress}. Contact the customer at ${deliveryUser.phoneNumber}.`
    };
    // Code to send the notification to delivery guy using SMS or push notification

    // Update delivery status
    delivery.status = 'assigned';
    delivery.deliveryGuyId = deliveryGuy._id;
    await delivery.save();

    // Update delivery guy availability
    deliveryGuy.available = false;
    await deliveryGuy.save();

    return response.status(200).json({ message: 'Delivery notification sent.' });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Internal server error.' });
  }
}
