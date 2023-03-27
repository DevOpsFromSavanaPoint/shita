import { Restaurant } from '../models/restaurant';
import { Menu } from '../models/menu';


export const suggestRestaurantOrDish = async (req, res) => {
  try {
    const random = Math.floor(Math.random() * 2); // 0 para restaurante, 1 para prato do dia
    let suggestion = {};

    if (random === 0) {
      // busca um restaurante aleatório
      const restaurantsCount = await Restaurant.countDocuments();
      const randomRestaurantIndex = Math.floor(Math.random() * restaurantsCount);
      const restaurant = await Restaurant.findOne().skip(randomRestaurantIndex);

      suggestion = {
        type: 'restaurant',
        name: restaurant.name,
        address: restaurant.address,
        phone: restaurant.phone
      };
    } else {
      // busca um prato do dia aleatório
      const menus = await Menu.find().populate('products');
      const randomMenuIndex = Math.floor(Math.random() * menus.length);
      const menu = menus[randomMenuIndex];

      const products = menu.products.filter(product => product.type === 'dish');
      const randomProductIndex = Math.floor(Math.random() * products.length);
      const dish = products[randomProductIndex];

      suggestion = {
        type: 'dish',
        name: dish.name,
        description: dish.description,
        price: dish.price
      };
    }

    res.status(200).json(suggestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
