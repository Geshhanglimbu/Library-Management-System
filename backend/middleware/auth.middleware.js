import jwt from 'jsonwebtoken';

export const authorizeToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user data (e.g., _id, role) in request
    next();
  } catch (error) {
    console.error("Authorization error:", error.message, error.stack);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const restrictToLibrarian = (req, res, next) => {
  if (req.user.role !== 'librarian') {
    return res.status(403).json({ message: "Access restricted to librarians" });
  }
  next();
};