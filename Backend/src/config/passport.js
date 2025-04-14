const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { generateToken } = require('../config/jwt');
const User = require('../models/user')
const dotenv = require('dotenv');

dotenv.config();

//  passport-google-oauth2
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5001/api/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {

    const email = profile.emails[0].value;
    const googleId = profile.id;

    let user = await User.findOne({ googleId });


    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        user.googleId = googleId;
      } else {
        user = new User({
          googleId: profile.id,  // Google ID
          email: email,
          name: profile.displayName,
          role: 'customer'
        });
      }
    }
    await user.save();

    const token = await generateToken({ id: user._id, role: user.role,});



    return done(null, { user, token });
  }
));

module.exports = passport;