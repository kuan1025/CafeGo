const Size  = require('../models/size');

exports.createSize = async (req, res) => {
  try {
    const { label, additionalCost } = req.body;
    const newSize = new Size({ label, additionalCost });
    await newSize.save();
    res.status(201).json(newSize);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating size', error });
  }
};

exports.getAllSizes = async (req, res) => {
  try {
    const size = await Size.find();
    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving size', error });
  }
};

exports.getById = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving size', error });
  }
};

exports.deleteSize = async (req, res) => {
  try {
    const deletedSize = await Size.findByIdAndDelete(req.params.id);
    if (!deletedSize) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.status(200).json({ message: 'Size deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting size', error });
  }
};
