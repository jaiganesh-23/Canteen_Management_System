import express from "express";
import { registerUser, loginUser, getCanteens } from "../controllers/authController.js";


const router = express.Router();

// Routes for user registration and login
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/canteens", getCanteens);

// Export the router
export default router;