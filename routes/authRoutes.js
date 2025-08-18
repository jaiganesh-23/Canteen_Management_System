import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";


const router = express.Router();

// Routes for user registration and login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Export the router
export default router;