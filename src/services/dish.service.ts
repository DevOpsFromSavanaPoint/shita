import { Request, Response } from "express";
import { Dish } from '../models/Dish';


export const DishService = {


// lista todas as dishes
 getAllDishes: async (req: Request, res: Response) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

// obtem uma dish pelo id
 getDishById: async (req: Request, res: Response) => {
  try {
    const dish = await Dish.findById({_id: req.params._id});
    if (!dish) {
      return res.status(404).json({ message: 'Dish não encontrada' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

// cria uma nova dish
 createDish: async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  const dish = new Dish({ name, description, price });
  try {
    const newDish = await dish.save();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

// atualiza uma dish pelo id
 updateDish: async (req: Request, res: Response) => {
  const { name, description, price } = req.body;
  try {
    const dish = await Dish.findById({_id: req.params._id});
    if (!dish) {
      return res.status(404).json({ message: 'Dish não encontrada' });
    }
    dish.name = name || dish.name;
    dish.description = description || dish.description;
    dish.price = price || dish.price;
    const updatedDish = await dish.save();
    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

// exclui uma dish pelo id
 deleteDish: async (req: Request, res: Response) => {
  try {
    const dish = await Dish.findById({_id: req.params._id});
    if (!dish) {
      return res.status(404).json({ message: 'Dish não encontrada' });
    }
    await dish.deleteOne({_id: req.params._id});
    res.status(200).json({ message: 'Dish removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
}