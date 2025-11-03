import express from "express";
import {
  getAllOrders,
  getOrderStatistics,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Get all orders
router.get("/", getAllOrders);

// Get order statistics
router.get("/statistics", getOrderStatistics);

// Get a single order
router.get("/:id", getOrderById);

// Create a new order
router.post("/", createOrder);

// Update an order
router.put("/:id", updateOrder);

// Update order status
router.patch("/:id/status", updateOrderStatus);

export default router;
