const jwt = require('jsonwebtoken');
const JWT_EXPIRATION_TIME = '1h';  
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

// generate JWT Token
const generateToken = (payload) => {
    if (!payload || !payload.id || !payload.role) {
      console.error("Invalid token payload:", payload);
      throw new Error('Invalid token payload.');
    }
  
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
}

// verify JWT Token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
