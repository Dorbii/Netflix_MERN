import express from "express";
import { signup, logout, login, authCheck } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.middleware.js';


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);

export default router;