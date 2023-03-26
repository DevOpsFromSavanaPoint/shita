import { Request, Response } from "express";
import { Menu } from '../models/Menu';



export const MenuService = {
  getAllMenus: async (req: Request, res: Response) => {
    try {
      const menus = await Menu.find();
      res.json(menus);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getMenuById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const menu = await Menu.findById(id);
      if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
      }
      res.json(menu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createMenu: async (req: Request, res: Response) => {
    const { name, description, price, restaurant_id } = req.body;
    try {
      const newMenu = new Menu({
        name,
        description,
        price,
        restaurant_id
      });
      await newMenu.save();
      res.status(201).json(newMenu);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  updateMenu: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
      let menu = await Menu.findById(id);
      if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
      }
      menu.name = name;
      menu.description = description;
      menu.price = price;
      await menu.save();
      res.json(menu);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  deleteMenu: async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
      const menu = await Menu.findById(_id);
      if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
      }
      await menu.deleteOne({_id});
      res.json({ message: 'Menu deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
}