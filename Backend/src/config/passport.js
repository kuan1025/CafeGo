const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { generateToken } = require('../config/jwt');

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
    const user = {
      googleId: profile.id,  // Google ID
      email: profile.emails[0].value,  
      name: profile.displayName,  
      role: 'user',  
      token: token
    };

    console.log("DEBUG 1:", user);
    return done(null, user);
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