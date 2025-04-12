const ExtraOption = require('../models/extraOption');


exports.createExtraOption = async (req, res) => {
  try {
    const { name, price } = req.body;


    const newExtraOption = new ExtraOption({
      name,
      price,
    });

    await newExtraOption.save();
    res.status(201).json(newExtraOption);
  } catch (error) {
    res.status(500).json({ message: 'Error creating extra option', error });
  }
};


exports.getAllExtraOptions = async (req, res) => {
  try {
    const extraOptions = await ExtraOption.find();
    res.status(200).json(extraOptions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving extra options', error });
  }
};


exports.getExtraOptionById = async (req, res) => {
  try {
    const extraOption = await ExtraOption.findById(req.params.id);
    if (!extraOption) {
      return res.status(404).json({ message: 'Extra option not found' });
    }
    res.status(200).json(extraOption);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving extra option', error });
  }
};


exports.updateExtraOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const updatedExtraOption = await ExtraOption.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (!updatedExtraOption) {
      return res.status(404).json({ message: 'Extra option not found' });
    }

    res.status(200).json(updatedExtraOption);
  } catch (error) {
    res.status(500).json({ message: 'Error updating extra option', error });
  }
};

// Delete an ExtraOption
exports.deleteExtraOption = async (req, res) => {
  try {
    const extraOption = await ExtraOption.findByIdAndDelete(req.params.id);
    if (!extraOption) {
      return res.status(404).json({ message: 'Extra option not found' });
    }
    res.status(200).json({ message: 'Extra option deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting extra option', error });
  }
};
