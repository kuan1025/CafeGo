const express = require('express');
const passport = require('./src/config/passport');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const app = express();
const session = require('express-session');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();


// set CORS & JSON body 
app.use(cors());
app.use(express.json());



// session
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false } 
}));

// init Passport
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    next();
  });

app.use('/', routes);

const mongoDB = process.env.MONGODB_URI || "mongodb://localhost:27017/task-manager";
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
