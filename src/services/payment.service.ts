import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { Order } from "../models/Order";

exports.create = async (req: Request, res: Response) => {
  const { order_id, amount } = req.body;
try {
    // realiza a validação do pedido
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.total !== amount) {
      return res.status(400).json({ message: 'Invalid payment amount' });
    }
    // realiza o pagamento
    const newPayment = new Payment({
      order: order_id,
      amount
    });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
