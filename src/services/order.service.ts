import { Request, Response } from "express";
import { Order } from '../models/Order';

export const OrderService = {
  getUserOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getOrderById: async (req: Request, res: Response) => {
    try {
      const order = await Order.findById(req.params.id).populate('items.item');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (order.user.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createOrder: async (req: Request, res: Response) => {
    const {user, items, total } = req.body;
    try {
      const order = new Order({ user: req.user._id, items });
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  updateOrder: async (req: Request, res: Response) => {
    const { status } = req.body;
    try {
      const order = await Order.findById({_id: req.params._id});
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (order.user.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      order.status = status || order.status;
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  deleteOrder: async (req: Request, res: Response) => {
    try {
      const order = await Order.findById({_id: req.params._id});
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if (order.user.toString() !== req.params._id) {
        return res.status(403).json({ message: 'Access denied' });
      }
      await order.deleteOne({_id: req.params._id});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
}