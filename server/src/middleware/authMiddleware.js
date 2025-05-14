const { verifyToken } = require('../config/jwt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

exports.authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get Token from Authorization header  

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded;  // decode user info -> add to req
  next();
};

exports.authenticateAdmin = (req, res, next) => {

  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  req.user = decoded;
  const roles = req.user?.roles;
  console.log(roles)
  if (!roles || !roles.includes('admin')) {
    return res.status(403).json({ message: 'Access Forbidden: Admins Only' });
  }
  
  next();
};


exports.authMiddleware = (req, res, next) => {
  // console.log("debug : authMiddleware " + " token" + req.cookies.token )
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: "No token" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("middleware decoded user:", decoded);
    req.user = decoded; 

    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Invalid token" });
  }
};



