import express from "express";
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  toggleSupplierStatus,
} from "../controllers/supplierController.js";

const router = express.Router();

// Get all suppliers
router.get("/", getAllSuppliers);

// Get a single supplier
router.get("/:id", getSupplierById);

// Create a new supplier
router.post("/", createSupplier);

// Update a supplier
router.put("/:id", updateSupplier);

// Delete a supplier
router.delete("/:id", deleteSupplier);

// Toggle supplier active status
router.patch("/:id/toggle-status", toggleSupplierStatus);

export default router;
