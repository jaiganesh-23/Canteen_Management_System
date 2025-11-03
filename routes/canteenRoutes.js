import express from "express";
import {
  registerCanteen,
  getCanteensByUser,
  getCanteenById,
  updateCanteen,
  addStaffToCanteen,
  removeStaffFromCanteen,
} from "../controllers/canteenController.js";

const router = express.Router();

// Register a new canteen
router.post("/register", registerCanteen);

// Get all canteens for a user
router.get("/user/:userId", getCanteensByUser);

// Get a single canteen by ID
router.get("/:canteenId", getCanteenById);

// Update canteen details
router.put("/:canteenId", updateCanteen);

// Add staff to canteen
router.post("/:canteenId/staff", addStaffToCanteen);

// Remove staff from canteen
router.delete("/:canteenId/staff/:staffId", removeStaffFromCanteen);

export default router;
