import { Request, Response } from 'express';
import {Category} from '../models/Category';

export const CategoryService = {
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getCategoryById: async (req: Request, res: Response) => {
    try {
      const category = await Category.findById({_id: req.params._id});
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createCategory: async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  updateCategory: async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const category = await Category.findById({_id: req.params._id});
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      category.name = name || category.name;
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  deleteCategory: async (req: Request, res: Response) => {
    try {
      const category = await Category.findById({_id: req.params._id});
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await category.deleteOne({_id: req.params._id});
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
}