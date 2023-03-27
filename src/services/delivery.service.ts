import { Request, Response } from 'express';
import { Delivery } from '../models/delivery';
import { DeliveryPerson } from '../models/DeliveryPerson';
import { Order } from '../models/order';

export const createDelivery = async (req: Request, res: Response) => {
  try {
    const { orderId, deliveryPersonId } = req.body;

    // Verifica se a ordem e o entregador existem
    const order = await Order.findById(orderId);
    const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId);

    if (!order) {
      return res.status(400).json({ error: 'Ordem não encontrada' });
    }

    if (!deliveryPerson) {
      return res.status(400).json({ error: 'Entregador não encontrado' });
    }

    // Verifica se a ordem já tem uma entrega associada
    const existingDelivery = await Delivery.findOne({ order: orderId });

    if (existingDelivery) {
      return res.status(400).json({ error: 'Já existe uma entrega para esta ordem' });
    }

    // Cria a entrega
    const delivery = new Delivery({
      order: orderId,
      deliveryPerson: deliveryPersonId,
      status: 'Pendente'
    });

    await delivery.save();

    // Atualiza o entregador para indicar que ele está ocupado
    deliveryPerson.isWorking = true;
    deliveryPerson.isAvailable = false;
    deliveryPerson.orders.push(delivery.order);
    await deliveryPerson.save();

    return res.status(201).json(delivery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar entrega' });
  }
};

export const updateDeliveryStatus = async (req: Request, res: Response) => {
  try {
    const { deliveryId, status } = req.body;

    const delivery = await Delivery.findById(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Entrega não encontrada' });
    }

    if (delivery.status === 'Concluída' || delivery.status === 'Cancelada') {
      return res.status(400).json({ error: 'Entrega já concluída ou cancelada' });
    }

    delivery.status = status;

    if (status === 'Concluída' || status === 'Cancelada') {
      const deliveryPerson = await DeliveryPerson.findById(delivery.deliveryPerson);
      deliveryPerson.isWorking = false;
      deliveryPerson.isAvailable = true;
      await deliveryPerson.save();
    }

    await delivery.save();

    return res.status(200).json(delivery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar status de entrega' });
  }
};
