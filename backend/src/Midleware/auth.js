// src/middleware/auth.middleware.js


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting: "Bearer <token>"
  console.log(" i am middleware")

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY); // Set JWT_SECRET in .env
    req.user = decoded; // decoded contains the payload (e.g., { _id, email, iat, exp })
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
