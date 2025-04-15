const express = require('express');
const passport = require('./src/config/passport');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");




dotenv.config();


// set CORS & JSON body 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
    exposedHeaders: ["Authorization","Link"],// pagination
  }));
app.use(express.json());


// product image upload
app.use("/api/uploads", express.static("uploads"));


// session OAuth2
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false } 
}));


// cookie
app.use(cookieParser());


// init Passport
app.use(passport.initialize());
app.use(passport.session());

// debug
app.use((req, res, next) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    next();
  });

app.use('/', routes);


const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/cafeGo";


main().catch((err) => console.log(err));
// MongoDB
async function main() {
    await mongoose.connect(mongoDB);
}



// run server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
