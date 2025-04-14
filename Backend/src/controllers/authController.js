const passport = require('../config/passport');
const User = require('../models/user');
const dotenv = require('dotenv');
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

    const { _id, name, email, role } = user;


    res.json({ user :{
      name : user.name,
      email : user.email,
      role : user.role
    } ,token });
    
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "getMe error" });
  }
};


// app.get("/api/me", authMiddleware, async (req, res) => {
//   const user = await User.findById(req.user.id)
//   .select("-password"); // except password!!
//   res.json(user);
// });

