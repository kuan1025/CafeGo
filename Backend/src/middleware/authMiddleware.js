const { verifyToken } = require('../config/jwt');

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

exports.authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access Forbidden: Admins Only' });
  }
  next();
};


