const express = require('express');
const {authenticateUser }= require('../middleware/authMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/', productController.getAllProducts);

router.get('/categories' , productController.getProductCategories);

router.get('/milkOptuins', productController.getMilkOptionsValues);

router.get('/:id', productController.getProductById);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);



module.exports = router;
