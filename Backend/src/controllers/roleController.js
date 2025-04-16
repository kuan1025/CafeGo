const Role = require('../models/Role');


exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Role name is required' });

    const existing = await Role.findOne({ name });
    if (existing) return res.status(409).json({ message: 'Role already exists' });

    const role = new Role({ name });
    await role.save();
    res.status(201).json(role); 
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles); 
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.updateRoleById = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Role name is required' });

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!role) return res.status(404).json({ message: 'Role not found' });

    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.deleteRoleById = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    res.status(200).json({ message: 'Role deleted successfully' }); 
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
