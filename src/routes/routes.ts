import { UserService } from './../services/user.service';
import { Router } from 'express';


const router = Router();
// Gerenciamento de usuários

router.get('/users', UserService.getAllUsers);
router.get('/users/:uid', UserService.getUserById);
router.post('/users', UserService.createUser);
router.put('/users/:id', UserService.updateUser);
router.delete('/users/:id', UserService.deleteUser);


// Gerenciamento de restaurantes
router.get('/restaurants', RestaurantController.list);
router.get('/restaurants/:id', RestaurantController.show);
router.post('/restaurants', RestaurantController.create);
router.put('/restaurants/:id', RestaurantController.update);
router.delete('/restaurants/:id', RestaurantController.delete);
router.get('/restaurants/:id/menu', RestaurantController.listMenu);
router.post('/restaurants/:id/menu', RestaurantController.addMenuItem);
router.put('/restaurants/:id/menu/:itemId', RestaurantController.updateMenuItem);
router.delete('/restaurants/:id/menu/:itemId', RestaurantController.deleteMenuItem);

// Gerenciamento de pratos
router.get('/dishes', DishController.list);
router.get('/dishes/:id', DishController.show);
router.post('/dishes', DishController.create);
router.put('/dishes/:id', DishController.update);
router.delete('/dishes/:id', DishController.delete);

// Gerenciamento de categorias de pratos
router.get('/categories', CategoryController.list);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.create);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

// Gerenciamento de pedidos de usuários
router.get('/orders', OrderController.list);
router.get('/orders/:id', OrderController.show);
router.post('/orders', OrderController.create);
router.put('/orders/:id', OrderController.update);
router.delete('/orders/:id', OrderController.delete);

// Gerenciamento de pagamentos online
router.post('/payments/:orderId', PaymentController.create);

// Gerenciamento de avaliações e comentários
router.get('/restaurants/:restaurantId/reviews', ReviewController.list);
router.get('/restaurants/:restaurantId/reviews/:id', ReviewController.show);
router.post('/restaurants/:restaurantId/reviews', ReviewController.create);
router.put('/restaurants/:restaurantId/reviews/:id', ReviewController.update);
router.delete('/restaurants/:restaurantId/reviews/:id', ReviewController.delete);

// Gerenciamento de notificações
router.get('/notifications', NotificationController.list);
router.get('/notifications/:id', NotificationController.show);
router.post('/notifications', NotificationController.create);

// Gerenciamento de entregadores
router.get('/drivers', DriverController.list);
router.get('/drivers/:id', DriverController.show);
router.post('/drivers', DriverController.create);
router.put('/drivers/:id', DriverController.update);
router.delete('/drivers/:id', DriverController.delete);

// Gerenciamento de entregas
router.get('/deliveries', DeliveryController.list);
router.get('/deliveries/:id', DeliveryController.show);
router.post('/deliveries', DeliveryController.create);
router.put('/deliveries/:id', DeliveryController.update);
router.delete('/deliveries/:id', DeliveryController.delete);

module.exports = router;
