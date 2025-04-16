const passport = require('../config/passport');
const User = require('../models/user');
const dotenv = require('dotenv');
const { generateToken } = require('../config/jwt');
const Role = require('../models/Role')
dotenv.config();


// Google login
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google login callback
exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, data, info) => {
    //  console.log("PASS : "+ data)
    if (err) return next(err);
    if (!data) return res.redirect('/');

    const { user, token } = data;

    // save in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days (test)
    });

    res.redirect("http://localhost:5173/oauth-success");
    // const redirectUrl = `http://localhost:5173/oauth-success?token=${token}&name=${encodeURIComponent(user.name)}&email=${user.email}&role=${user.role}`;
    // res.redirect(redirectUrl);


  })(req, res, next);

};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // populate -> Role
    const user = await User.findOne({ email }).populate('roles', 'name');

    if (!user) {
      return res.status(401).json({ message: "email is not existed or Incorrect password" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "email is not existed or Incorrect password" });
    }

    //  all roles
    const token = generateToken({ id: user._id, roles: user.roles.map(r => r.name) });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        roles: user.roles.map(r => r.name)
      }, token
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err });
  }
};

exports.signUp = async (req, res) => {
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


// log out
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out", error: err });
    }
    res.json({ message: "Logged out successfully" });
  });
};



exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const token = req.cookies.token;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.populate('roles', 'name');
    res.json({
      user: {
        name: user.name,
        email: user.email,
        roles: user.roles.map(r => r.name)
      }, token
    });

  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "getMe error" });
  }
};




