const ExtraOption = require('../models/extraOption');  // assuming the model file is called 'extraOption.js'

// Create a new ExtraOption
exports.createExtraOption = async (req, res) => {
  try {
    const { name, options } = req.body;

    // Validate the request body
    if (!name || !options || options.length === 0) {
      return res.status(400).json({ message: 'Name and at least one option are required' });
    }

    // Create and save the new ExtraOption
    const newExtraOption = new ExtraOption({ name, options });
    await newExtraOption.save();
    res.status(201).json(newExtraOption);
  } catch (error) {
    res.status(500).json({ message: 'Error creating extra option', error });
  }
};

// Get all ExtraOptions
exports.getAllExtraOptions = async (req, res) => {
  try {
    const extraOptions = await ExtraOption.find();
    res.status(200).json(extraOptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching extra options', error });
  }
};

// Get a single ExtraOption by ID
exports.getExtraOptionById = async (req, res) => {
  try {
    const extraOption = await ExtraOption.findById(req.params.id);
    if (!extraOption) {
      return res.status(404).json({ message: 'Extra option not found' });
    }
    res.status(200).json(extraOption);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching extra option', error });
  }
};

// Update an ExtraOption by ID
exports.updateExtraOption = async (req, res) => {
  try {
    const { name, options } = req.body;

    // Validate the request body
    if (!name || !options || options.length === 0) {
      return res.status(400).json({ message: 'Name and at least one option are required' });
    }

    // Find and update the ExtraOption
    const updatedExtraOption = await ExtraOption.findByIdAndUpdate(
      req.params.id,
      { name, options },
      { new: true, runValidators: true }
    );

    if (!updatedExtraOption) {
      return res.status(404).json({ message: 'Extra option not found' });
    }

    res.status(200).json(updatedExtraOption);
  } catch (error) {
    res.status(500).json({ message: 'Error updating extra option', error });
  }
};

// Delete an ExtraOption by ID
exports.deleteExtraOption = async (req, res) => {
  try {
    const deletedExtraOption = await ExtraOption.findByIdAndDelete(req.params.id);
    if (!deletedExtraOption) {
      return res.status(404).json({ message: 'Extra option not found' });
    }
    res.status(200).json({ message: 'Extra option deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting extra option', error });
  }
};
