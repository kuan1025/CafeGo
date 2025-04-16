const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const {authenticateUser, authenticateAdmin}= require('../middleware/authMiddleware');


// Create
router.post("/",authenticateAdmin, categoryController.createCategory);

// Read
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

// Update
router.put("/:id",authenticateAdmin, categoryController.updateCategory);

// Delete
router.delete("/:id",authenticateAdmin, categoryController.deleteCategory);

module.exports = router;
