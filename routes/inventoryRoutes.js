import express from "express";
import {
  getAllInventory,
  getLowStockItems,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  updateStock,
} from "../controllers/inventoryController.js";

const router = express.Router();

// Get all inventory items for a canteen
router.get("/", getAllInventory);

// Get low stock items
router.get("/low-stock", getLowStockItems);

// Get a single inventory item
router.get("/:id", getInventoryById);

// Create a new inventory item
router.post("/", createInventory);

// Update an inventory item
router.put("/:id", updateInventory);

// Delete an inventory item
router.delete("/:id", deleteInventory);

// Update stock level
router.patch("/:id/stock", updateStock);

export default router;
