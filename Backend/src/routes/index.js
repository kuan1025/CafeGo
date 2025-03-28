const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const extraOptionRoutes = require('./extraOption');
const flavorRoutes = require('./flavor');
const sizeRoutes = require('./size');
const orderDetailRoute = require('./orderDetail');


router.use('/auth', authRoutes);

router.use('/api/product/', productRoutes);
router.use('/api/extraOption/', extraOptionRoutes);
router.use('/api/flavors/', flavorRoutes);
router.use('/api/size/', sizeRoutes);

router.use('/api/orders', orderRoutes);
router.use('/api/orderDetail', orderDetailRoute);





module.exports = router;
