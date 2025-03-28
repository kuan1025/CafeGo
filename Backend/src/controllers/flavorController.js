const Flavor  = require('../models/flavor');

// Create a new Flavor
exports.createFlavor = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newFlavor = new Flavor({ name, price });
    await newFlavor.save();
    res.status(201).json(newFlavor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating flavor', error });
  }
};

// Get all 
exports.getAllFlavors = async (req, res) => {
  try {
    const flavors = await Flavor.find();
    res.status(200).json(flavors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flavors', error });
  }
};

exports.getFlavorById = async (req, res) => {
  try {
    const flavor = await Flavor.findById(req.params.id);
    if (!flavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }
    res.status(200).json(flavor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flavor', error });
  }
};

// Update a specific Flavor by ID
exports.updateFlavor = async (req, res) => {
  try {
    const { name, price } = req.body;
    const updatedFlavor = await Flavor.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true }
    );
    if (!updatedFlavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }
    res.status(200).json(updatedFlavor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating flavor', error });
  }
};

// Delete a specific Flavor by ID
exports.deleteFlavor = async (req, res) => {
  try {
    const deletedFlavor = await Flavor.findByIdAndDelete(req.params.id);
    if (!deletedFlavor) {
      return res.status(404).json({ message: 'Flavor not found' });
    }
    res.status(200).json({ message: 'Flavor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flavor', error });
  }
};