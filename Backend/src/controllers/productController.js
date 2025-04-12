const Product = require("../models/product");
const ExtraOption = require("../models/extraOption");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

// Create a new Product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      basePrice,
      imageUrl,
      sizes,  // Array of { label, price }
      milkOptions, // Array of { name, price }
      extras,
      allowMilkOptions
    } = req.body;

    // Validate sizes and milkOptions structure
    if (!Array.isArray(sizes) || !sizes.every(s => s.label && s.price)) {
      return res.status(400).json({ message: 'Invalid sizes format' });
    }

    if (!Array.isArray(milkOptions) || !milkOptions.every(m => m.name && m.price)) {
      return res.status(400).json({ message: 'Invalid milk options format' });
    }

    const productExtraOptions = await ExtraOption.find({ _id: { $in: extras } });

    

    // Create the new product directly with embedded sizes and milkOptions
    const newProduct = new Product({
      name,
      description,
      category,
      basePrice,
      imageUrl,
      sizes,  
      milkOptions,  
      extras : productExtraOptions,  
      allowMilkOptions
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Update an existing Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      basePrice,
      imageUrl,
      sizes,  
      milkOptions, 
      extras,
      allowMilkOptions
    } = req.body;

    // Validate sizes and milkOptions structure
    if (!Array.isArray(sizes) || !sizes.every(s => s.label && s.price)) {
      return res.status(400).json({ message: 'Invalid sizes format' });
    }

    if (!Array.isArray(milkOptions) || !milkOptions.every(m => m.name && m.price)) {
      return res.status(400).json({ message: 'Invalid milk options format' });
    }

    const productExtraOptions = await ExtraOption.find({ _id: { $in: extras } });


    if (productExtraOptions.length !== extraOptions.length) {
      return res.status(404).json({ message: 'Some extra options not found' });
    }

    // Update the product with the provided details
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        basePrice,
        imageUrl,
        sizes, 
        milkOptions,  
        extras : productExtraOptions,
        allowMilkOptions
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

exports.getProductCategories = async (req, res) => {
  try {
    const categories = Product.getCategoryEnumValues();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

exports.getMilkOptionsValues = async (req, res) => {
  try {
    const options = Product.getMilkOptionsEnumValues();
    res.status(200).json({ options });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching options', error });
  }
};
