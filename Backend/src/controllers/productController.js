const  Product  = require("../models/product");
const  Size  = require("../models/size");
const  ExtraOption  = require("../models/extraOption");
const  Flavor = require("../models/flavor");



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
      sizes,
      milkOptions,
      extraShot,
      extras,
      flavors,
      allowMilkOptions,
      allowExtraShot
    } = req.body;

    const productSizes = await Size.find({ _id: { $in: sizes } });
    const productFlavors = await Flavor.find({ _id: { $in: flavors } });
    const productExtras = await ExtraOption.find({ _id: { $in: extras } });

   

    const newProduct = new Product({
      name,
      description,
      category,
      basePrice,
      imageUrl,
      sizes: productSizes,
      milkOptions,
      extraShot,
      extras: productExtras,
      flavors: productFlavors,
      allowMilkOptions,
      allowExtraShot
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error.message)
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
      extraShot,
      extras,
      flavors,
      allowMilkOptions,
      allowExtraShot
    } = req.body;

 
    const productSizes = await Size.find({ _id: { $in: sizes } });
    const productFlavors = await Flavor.find({ _id: { $in: flavors } });
    const productExtras = await ExtraOption.find({ _id: { $in: extras } });

    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        basePrice,
        imageUrl,
        sizes: productSizes,
        milkOptions,
        extraShot,
        extras: productExtras,
        flavors: productFlavors,
        allowMilkOptions,
        allowExtraShot
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

