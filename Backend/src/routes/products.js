const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');


router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', authMiddleware, createProduct);

router.put('/:id', authMiddleware, updateProduct);

router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
