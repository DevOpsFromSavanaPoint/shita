import { Request, Response } from 'express';
import { Item } from '../models/Item';


export const ItemService = {

// cria um item
createItem: async (req, res) => {
    try {
      const newItem = new Item(req.body);
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar item' });
    }
  },
  
  // busca todos os items
  getAllItems: async (req, res) => {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar items' });
    }
  },
  
  // busca um item pelo id
  getItemById: async (req, res) => {
    try {
      const item = await Item.findById(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item não encontrado' });
      }
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar item' });
    }
  },
  
  // atualiza um item pelo id
  updateItemById: async (req, res) => {
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.itemId,
        req.body,
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item não encontrado' });
      }
      res.json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar item' });
    }
  },
  
  // deleta um item pelo id
  deleteItemById: async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.itemId);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item não encontrado' });
      }
      res.json({ message: 'Item deletado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar item' });
    }
  }
  
}