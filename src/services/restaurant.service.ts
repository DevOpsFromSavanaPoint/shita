import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant";


export const RestaurantsService = {
  getAllRestaurants: async (req: Request, res: Response) => {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRestaurantById: async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
      const restaurant = await Restaurant.findById(_id);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createRestaurant: async (req: Request, res: Response) => {
    const { name, description, address, phone } = req.body;
    try {
      const newRestaurant = new Restaurant({
        name,
        description,
        address,
        phone
      });
      await newRestaurant.save();
      res.status(201).json(newRestaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateRestaurant: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { name, description, address, phone } = req.body;
    try {
      let restaurant = await Restaurant.findById(_id);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      restaurant.name = name;
      restaurant.description = description;
      restaurant.address = address;
      restaurant.phone = phone;
      await restaurant.save();
      res.json(restaurant);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteRestaurant: async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
      const restaurant = await Restaurant.findById(_id);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
      await restaurant.deleteOne({_id});
      res.json({ message: 'Restaurant deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}