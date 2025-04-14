const Category = require("../models/Category");


exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: "Category already exists" 
      });
    }

    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ 
      success: true, 
      message: "Category created successfully.", 
      data: category 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: "Server error: " + err.message 
    });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;


    // Not Equal -> is existed ?
    const existing = await Category.findOne({ name, _id: { $ne: req.params.id } });

    if (existing) {
      return res.status(400).json({ message: "Category with this name already exists" });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id, // by Id
      { name, description },
      { new: true } // return updated category
    );

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json(category);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Try again later" });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) 
      return res.status(404).json({ message: "Category not found" });

    return res.json({  message: "Category deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
