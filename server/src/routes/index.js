const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const extraOptionRoutes = require('./extraOption');
const orderDetailRoute = require('./orderDetail');
const userRoutes = require('./user');
const categoryRoutes = require('./category')
const roleRoutes = require('./role')


const {authenticateAdmin, authenticateUser}= require('../middleware/authMiddleware');


router.use('/api/auth', authRoutes);


// admin only
router.use('/api/user', authenticateAdmin, userRoutes);
router.use('/api/role', authenticateAdmin, roleRoutes);

// all users
router.use('/api/product/', productRoutes);
router.use('/api/extraOption/', extraOptionRoutes);
router.use('/api/category', categoryRoutes);
router.use('/api/order', orderRoutes);



module.exports = router;
