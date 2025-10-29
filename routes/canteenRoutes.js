import express from "express";
import { registerCanteen, getMenuItems, registerMenuItem, addNewCanteen } from "../controllers/canteenController.js";

const router = express.Router();

// Route to register a new canteen
router.post("/register", registerCanteen);
// Route to get menu items of a canteen
router.post("/menu", getMenuItems);
// Route to register a new menu item
router.post("/menu/register", registerMenuItem);
// Route to add a new canteen
router.post("/add", addNewCanteen);

// Export the router
export default router;
