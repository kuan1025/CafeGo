const express = require('express');
const router = express.Router();
const flavorController = require('../controllers/flavorController');



// Create a new Flavor
router.post('/', flavorController.createFlavor);
// Get all Flavors
router.get('/', flavorController.getAllFlavors);
// Get a specific Flavor by ID
router.get('/:id', flavorController.getFlavorById);
// Update a specific Flavor by ID
router.put('/:id', flavorController.updateFlavor);
// Delete a specific Flavor by ID
router.delete('/:id', flavorController.deleteFlavor);


module.exports = router;