const Product = require("../models/Product");
const Category = require("../models/Category");
const ExtraOption = require("../models/extraOption");
const fs = require("fs");
const path = require("path");
const { generatePaginationLinks } = require("../utils/generatePaginationLinks")



exports.getAllProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 12, sort } = req.query;
    const filter = category ? { category } : {};
   
    let sortOption = {}; 
    if (sort === 'price_asc') {
      sortOption = { basePrice: 1 };  
    } else if (sort === 'price_desc') {
      sortOption = { basePrice: -1 };  
    }

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit) // skip 
      .limit(parseInt(limit));

    // Add pagination link headers
    const links = generatePaginationLinks(req.originalUrl, parseInt(page), totalPages, limit);
    // console.log(links)
    res
      .status(200)
      .links(links)
      .json({ products, totalPages, currentPage: parseInt(page) });

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(204).json({ message: 'Product not found' });
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
      available,
      allowMilkOptions,
      extras,
      sizes,
      milkOptions,
    } = req.body;

    // middleware -> req + file
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      name,
      description,
      category,
      basePrice,
      imageUrl,
      available,
      allowMilkOptions: allowMilkOptions === "true", // cuz formData is String!!
      extras: JSON.parse(extras),
      sizes: JSON.parse(sizes),
      milkOptions: JSON.parse(milkOptions),
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error", err);
    res.status(500).json({ message: "Server error" });
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
      allowMilkOptions,
    } = req.body;

    const parsedSizes = JSON.parse(req.body.sizes || "[]");
    const parsedMilkOptions = JSON.parse(req.body.milkOptions || "[]");
    const parsedExtras = JSON.parse(req.body.extras || "[]");

    // Validate sizes
    if (
      !Array.isArray(parsedSizes) ||
      !parsedSizes.every(
        (s) => typeof s.label === "string" && s.label && typeof s.price === "number"
      )
    ) {
      return res.status(400).json({ message: "Invalid sizes format" });
    }

    if (
      !Array.isArray(parsedMilkOptions) ||
      !parsedMilkOptions.every((m) => m.name && typeof m.price === "number")
    ) {
      return res.status(400).json({ message: "Invalid milk options format" });
    }

    // Find and validate related data
    const [product, extraOptions, cat] = await Promise.all([
      Product.findById(id),
      ExtraOption.find({ _id: { $in: parsedExtras } }),
      Category.findById(category),
    ]);

    if (!product) return res.status(204).json({ message: "Product not found" });
    if (extraOptions.length !== parsedExtras.length)
      return res.status(204).json({ message: "Some extra options not found" });
    if (!cat) return res.status(204).json({ message: "Category not found" });

    // Delete old image if new image is uploaded
    let imageUrl = product.imageUrl;
    
    if (req.file) {
      const oldImagePath = path.join(__dirname, "..", "..", product.imageUrl);
      console.log(" oldImagePath : " + oldImagePath)
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Update product
    product.name = name;
    product.description = description;
    product.category = category;
    product.basePrice = basePrice;
    product.allowMilkOptions = allowMilkOptions === "true";
    product.imageUrl = imageUrl;
    product.sizes = parsedSizes;
    product.milkOptions = parsedMilkOptions;
    product.extras = extraOptions;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Update product error", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(204).json({ message: 'Product not found' });
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
