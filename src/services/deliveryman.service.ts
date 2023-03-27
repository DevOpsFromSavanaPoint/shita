const Delivery = require('../models/Delivery');
const DeliveryPerson = require('../models/DeliveryPerson');

// Função para criar um novo entregador
exports.createDeliveryPerson = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const deliveryPerson = new DeliveryPerson({ name, email, phone });
    await deliveryPerson.save();
    res.status(201).json(deliveryPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para buscar um entregador pelo ID
exports.getDeliveryPersonById = async (req, res) => {
  try {
    const deliveryPerson = await DeliveryPerson.findById(req.params.id);
    if (!deliveryPerson) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }
    res.json(deliveryPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para atualizar um entregador
exports.updateDeliveryPerson = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const deliveryPerson = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    if (!deliveryPerson) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }
    res.json(deliveryPerson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para excluir um entregador
exports.deleteDeliveryPerson = async (req, res) => {
  try {
    const deliveryPerson = await DeliveryPerson.findByIdAndDelete(req.params.id);
    if (!deliveryPerson) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }
    // Remove o entregador de todas as entregas que ele estiver associado
    await Delivery.updateMany(
      { deliveryPerson: deliveryPerson._id },
      { $unset: { deliveryPerson: '' } }
    );
    res.json({ message: 'Entregador excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para listar todas as entregas associadas a um entregador
exports.getDeliveriesByDeliveryPersonId = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ deliveryPerson: req.params.id });
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
