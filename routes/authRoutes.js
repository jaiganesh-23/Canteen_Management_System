import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getStaffMembers,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember
} from "../controllers/authController.js";


const router = express.Router();

// Routes for user registration and login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Routes for user profile
router.get("/profile/:userId", getUserProfile);
router.put("/profile/:userId", updateUserProfile);

// Routes for staff management
router.get("/staff", getStaffMembers);
router.post("/staff", createStaffMember);
router.put("/staff/:id", updateStaffMember);
router.delete("/staff/:id", deleteStaffMember);

// Export the router
export default router;