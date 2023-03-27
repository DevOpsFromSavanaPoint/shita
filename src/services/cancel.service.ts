import { Request, Response } from 'express';
import { Order } from '../models/Order';
// Controller de cancelamento de pedidos



// Cancela um pedido específico
export const cancelOrder = async(req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
  
      // Verifica se o pedido já foi entregue
      if (order.status === 'completed') {
        return res.status(400).json({ message: "Pedido já foi entregue" });
      }
  
      // Verifica se o pedido já foi cancelado anteriormente
      if (order.status === "cancelled") {
        return res.status(400).json({ message: "Pedido já foi cancelado" });
      }
  
      // Verifica se o pedido já está em processo de cancelamento
      if (order.status === "processing") {
        return res
          .status(400)
          .json({ message: "Pedido já está sendo cancelado" });
      }
  
      // Define o status do pedido como "Cancelando"
      order.status = "cancelled";
      await order.save();
  
      // Executa a lógica de cancelamento em uma fila de tarefas
      await cancelOrderTask(order);
  
      return res.status(200).json({ message: "Pedido cancelado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao cancelar pedido" });
    }
  }
  
  // Simula a execução da lógica de cancelamento em uma fila de tarefas
  function cancelOrderTask(order) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Verifica se o pedido já foi entregue enquanto estava sendo cancelado
        if (order.delivered) {
          order.status = "Entregue";
        } else {
          order.status = "Cancelado";
        }
        order.cancelled_at = new Date();
        order.save();
  
        resolve();
      }, 5000);
    });
  }
  
  module.exports = {
    cancelOrder,
  };