const express = require('express');
const router = express.Router();



const { createUser, getAllUsers, login, updateUser, deleteUser, getUserById } = require('../controllers/userController');

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

// Get  user
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);



module.exports = router;
