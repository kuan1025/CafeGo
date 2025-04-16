const User = require('../models/User');
const Role = require('../models/Role')


exports.createUser = async (req, res) => {
  try {
    let { googleId, email, name, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // only customer
    const customerRole = await Role.findOne({ name: 'customer' });
    if (!customerRole) {
      return res.status(500).json({ message: 'Customer role not found in database' });
    }

    if (!googleId) googleId = '';

    const newUser = new User({ googleId, email, name, roles: [customerRole._id] , password});
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};


exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate('roles', 'name');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
};




exports.updateUser = async (req, res) => {
    try {

      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('roles', 'name');
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  };
  

exports.deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  };

  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('roles', 'name');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ message: 'Error fetching user', error });
    }
  };
  
  
  
