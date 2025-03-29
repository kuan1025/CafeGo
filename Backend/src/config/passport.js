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
  callbackURL: "http://localhost:5001/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    const token = await generateToken({ googleId: profile.id, role: 'user' });
    // console.log("gen token "+ token)

    // phone
    const axios = require('axios');
    const peopleApiUrl = 'https://people.googleapis.com/v1/people/me?personFields=phoneNumbers';
    const response = await axios.get(peopleApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({
        googleId: profile.id,  // Google ID
        email: profile.emails[0].value,
        name: profile.displayName,
        role: 'customer'
      });
    }
    await user.save();


    return done(null, { user, token });
  }
));


passport.serializeUser((user, done) => {
  console.log("Serializing user with googleId:", user.googleId);
  done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
  console.log("Deserializing user with googleId:", googleId);
  done(null, { googleId });
});

module.exports = passport;