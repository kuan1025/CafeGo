const express = require('express');
const router = express.Router();


const { createFlavor, getAllFlavors } = require('../controllers/flavorController');
const { createSize, getAllSizes } = require('../controllers/sizeController');

// Flavor Routes
router.post('/flavors', createFlavor);
router.get('/flavors', getAllFlavors);

// Size Routes
router.post('/sizes', createSize);
router.get('/sizes', getAllSizes);





module.exports = router;
