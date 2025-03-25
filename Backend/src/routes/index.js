const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const productRoutes = require('./products');
const orderRoutes = require('./orders');


router.use('/auth', authRoutes);


router.use('/api', productRoutes);


router.use('/orders', orderRoutes);

module.exports = router;
