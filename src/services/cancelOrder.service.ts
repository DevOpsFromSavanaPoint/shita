import { Response, Request } from 'express';
import { Order } from '../models/Order';

// Controller de cancelamento de pedidos

// Cancela um pedido específico
export async function cancelOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
  
      // Verifica se o pedido ainda não foi entregue
      if (order.delivered) {
        return res.status(400).json({ message: "Pedido já foi entregue" });
      }
  
      order.status = "Cancelado";
      await order.save();
  
      return res.status(200).json({ message: "Pedido cancelado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cancelar pedido" });
    }
  }
  

  