const express = require('express');
const router = express.Router();

const extraOptionController = require('../controllers/extraOptionController');
const { authenticateAdmin}= require('../middleware/authMiddleware');

router.post('/',authenticateAdmin, extraOptionController.createExtraOption);

router.get('/', extraOptionController.getAllExtraOptions);

router.get('/:id', extraOptionController.getExtraOptionById);

router.put('/:id',authenticateAdmin, extraOptionController.updateExtraOption);

router.delete('/:id',authenticateAdmin, extraOptionController.deleteExtraOption);


module.exports = router;