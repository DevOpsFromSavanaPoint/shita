import { Request, Response } from "express";
import { Product } from "../models/Product";

export const ProductService = {
  getProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getProductById: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  createProduct: async (req: Request, res: Response) => {
    const { name, description, price, category_id } = req.body;
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        category_id
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  updateProduct: async (req: Request, res: Response) => {
    const { name, description, price, category_id } = req.body;
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category_id = category_id || product.category_id;
      await product.save();
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.remove();
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
}