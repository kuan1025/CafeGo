const express = require('express');
const router = express.Router();

const extraOptionController = require('../controllers/extraOptionController');


// Create a new ExtraOption
router.post('/', extraOptionController.createExtraOption);
// Get all ExtraOption
router.get('/', extraOptionController.getAllExtraOptions);
// Get a specific ExtraOption by ID
router.get('/:id', extraOptionController.getExtraOptionById);
// Update a specific ExtraOption by ID
router.put('/:id', extraOptionController.updateExtraOption);
// Delete a specific ExtraOption by ID
router.delete('/:id', extraOptionController.deleteExtraOption);


module.exports = router;