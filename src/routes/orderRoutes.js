const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to list all orders
router.get('/list', orderController.listOrders);

// Route to get a specific order by orderId
router.get('/:orderId', orderController.getOrder);

// Route to update an order by orderId
router.put('/:orderId', orderController.updateOrder);

// Route to delete an order by orderId
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
