const express = require('express');
const router = express.Router();


const { createSize, getAllSizes } = require('../controllers/sizeController');



// Size Routes
router.post('/sizes', createSize);
router.get('/sizes', getAllSizes);





module.exports = router;
