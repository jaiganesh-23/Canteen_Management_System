import express from "express";
import {
  getAllMenuItems,
  getPopularItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from "../controllers/menuController.js";

const router = express.Router();

// Get all menu items
router.get("/", getAllMenuItems);

// Get popular menu items
router.get("/popular", getPopularItems);

// Get a single menu item
router.get("/:id", getMenuItemById);

// Create a new menu item
router.post("/", createMenuItem);

// Update a menu item
router.put("/:id", updateMenuItem);

// Delete a menu item
router.delete("/:id", deleteMenuItem);

// Toggle menu item availability
router.patch("/:id/toggle-availability", toggleAvailability);

export default router;
