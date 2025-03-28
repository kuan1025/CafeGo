const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController'); 


router.post('/', ordersController.createOrder);


router.get('/', ordersController.getAllOrders);


router.get('/:id', ordersController.getOrderById);


router.patch('/:id', ordersController.updateOrderStatus);


router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
