const express = require('express');
const router = express.Router();

const { createSize, getAllSizes, deleteSize , getById} = require('../controllers/sizeController');

// Size Routes
router.post('/', createSize);
router.get('/', getAllSizes);
router.delete('/:id', deleteSize);
router.get('/:id', getById);

getById


module.exports = router;
