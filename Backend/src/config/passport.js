const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { generateToken } = require('../config/jwt');
const User = require('../models/User')
const dotenv = require('dotenv');
const Role = require('../models/Role');

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

    const customerRole = await Role.findOne({ name: 'customer' });
    console.log("customerRole "+ customerRole)
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        user.googleId = googleId;
        
        if (!user.roles || user.roles.length === 0) {
          user.roles = customerRole ? [customerRole._id] : [];
        }
      } else {
        user = new User({
          googleId: profile.id,  // Google ID
          email: email,
          name: profile.displayName,
          roles: customerRole ? [customerRole._id] : []
        });
      }
    }
    await user.save();
    await user.populate('roles', 'name');
    
    const token = await generateToken({
      id: user._id,
      roles: user.roles.map(r => r.name)
    });

    return done(null, { user, token });
  }
));

module.exports = passport;