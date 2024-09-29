import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { readdir } from "fs/promises";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { validateBody, validateUniqueUser } from "../utils/validators.js";
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        const validationErr = validateBody(email, password, username, 'signup');
        if (validationErr) {
            return res.status(400).json(validationErr);
        }
        const existingUserByEmail = await User.findOne({ email });
        const existingUserByUsername = await User.findOne({ username });
        const validationUniqueErr = validateUniqueUser(existingUserByEmail, existingUserByUsername);
        if (validationUniqueErr) {
            return res.status(408).json(validationUniqueErr);
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const avatarFiles = await readdir(`.\\backend\\assets\\avatars\\`);
        const image = avatarFiles[Math.floor(Math.random() * avatarFiles.length)];
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image,
        })
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully", user: { ...newUser._doc, password: "" } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const validationErr = validateBody(email, password, null, 'login');
        if (validationErr) {
            return res.status(400).json(validationErr);
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch || !user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ success: true, message: "Logged in successfully", user: { ...user._doc, password: "" } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, message: "Authenticated", user: req.user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}