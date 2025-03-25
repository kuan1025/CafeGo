const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController'); 


router.post('/', ordersController.createOrder);


router.get('/', ordersController.getAllOrders);


router.get('/:orderId', ordersController.getOrderById);


router.patch('/:orderId', ordersController.updateOrderStatus);


router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
