const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Create
router.post("/", categoryController.createCategory);

// Read
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

// Update
router.put("/:id", categoryController.updateCategory);

// Delete
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
