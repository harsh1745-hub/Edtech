
import User from '../Models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
