const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const dotenv = require('dotenv');

// OAuth2
const session = require('express-session');
const passport = require('./src/config/passport');
const cookieParser = require("cookie-parser");

const rateLimit = require('express-rate-limit');
// test
// const {createDefaultUser} = require('./src/controllers/userController');
// const {createDefaultRoles} = require('./src/controllers/roleController')
const path = require("path");



const app = express();


dotenv.config();



// set CORS & JSON body 
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  exposedHeaders: ["Authorization", "Link"],// pagination
}));

app.use(express.json());

// product image upload
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));


// session OAuth2
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true, 
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // cross site cookie
  } // prod -> https
}));

// cookie
app.use(cookieParser());

// init Passport
app.use(passport.initialize());
app.use(passport.session());

// debug
// app.use((req, res, next) => {
//   console.log("Session ID:", req.sessionID);
//   console.log("Session:", req.session);
//   next();
// });


// Rate Limiting
const limiter = rateLimit({
  windowMs: 1000, //  a sec
  max: 10, //  10 req
  message: 'Too many requests, please try again later!',
});

app.use(limiter);

// routes
app.use('/', routes);


const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/cafeGo";


main().catch((err) => console.log(err));
// MongoDB
async function main() {
  await mongoose.connect(mongoDB);
  // await createDefaultRoles();
  // await createDefaultUser();
}



// run server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
