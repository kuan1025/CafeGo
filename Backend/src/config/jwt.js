const jwt = require('jsonwebtoken');
const JWT_EXPIRATION_TIME = '1h';  
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

// generate JWT Token
const generateToken = (user) => {
    
    if (!user) {
        console.error("Error: user object is undefined.");
        throw new Error('User object is undefined.');
    }

    console.log("User object:", user); 

    if (!user.googleId || !user.role) {
        console.error("Error: Missing user.googleId or user.role");
        throw new Error('Missing user.googleId or user.role');
    }
    return jwt.sign({ id: user.googleId, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
};

// verify JWT Token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
