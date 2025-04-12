const passport = require('../config/passport');


// Google login
exports.googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google login callback
exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, data, info) => {
     console.log("PASS : "+ data)
    if (err) return next(err);
    if (!data) return res.redirect('/');
    
    const { user, token } = data;

    const redirectUrl = `http://localhost:5173/oauth-success?token=${token}&name=${encodeURIComponent(user.name)}&email=${user.email}`;
    res.redirect(redirectUrl);


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

