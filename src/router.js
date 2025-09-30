const express = require('express');
const orderController = require('./controllers/orderController');
const orderMiddleware = require('./middlewares/orderMiddleware');

const productController = require('./controllers/productController');

const router = express.Router();
// PEDIDOS
router.get('/orders', orderController.getAll);
router.post('/orders', orderMiddleware.validateOrderCreation, orderController.createOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.put('/orders/:id', 
    orderMiddleware.validateFieldProduct,
    orderController.updateOrder
);
router.patch('/orders/:id', orderController.changeStatus);
router.patch('/orders/:id/recuse', orderController.recuseOrder);
// PRODUTOS
router.get('/products', productController.getProducts);


module.exports = router;
