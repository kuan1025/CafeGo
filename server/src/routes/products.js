const express = require('express');

const {authenticateAdmin, authenticateUser}= require('../middleware/authMiddleware');
const router = express.Router();
const productController = require('../controllers/productController');
const { uploadImg } = require('../middleware/imageStorage'); 


router.get('/', productController.getAllProducts);

router.get('/categories' , productController.getProductCategories);

router.get('/milkOptuins', productController.getMilkOptionsValues);

router.get('/:id', productController.getProductById);

router.post('/',authenticateAdmin, uploadImg.single("image"),productController.createProduct);

router.put('/:id',authenticateAdmin, uploadImg.single("image") ,productController.updateProduct);

router.delete('/:id',authenticateAdmin, productController.deleteProduct);



module.exports = router;
