const passport = require('../config/passport');
const { generateToken } = require('../config/jwt');

// Google login
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google login callback
exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');

    req.logIn(user, (err) => {
      if (err) return next(err);
      //  JWT Token
      const token = generateToken(user);
      // console.log("Session Data after Google login:", req.session);
      // console.log("User Data after Google login:", req.user);
      // console.log("Generated Token:", token);
      res.json({ token, user });
    });
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
