import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}