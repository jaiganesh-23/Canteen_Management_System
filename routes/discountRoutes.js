import express from "express";
import {
  getAllDiscounts,
  getDiscountById,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  validateDiscount,
} from "../controllers/discountController.js";

const router = express.Router();

// Get all discounts for a canteen
router.get("/", getAllDiscounts);

// Get a single discount
router.get("/:id", getDiscountById);

// Create a new discount
router.post("/", createDiscount);

// Update a discount
router.put("/:id", updateDiscount);

// Delete a discount
router.delete("/:id", deleteDiscount);

// Validate discount code
router.post("/validate", validateDiscount);

export default router;
