import Order from "../models/orderModel.js";
import Menu from "../models/menuModel.js";
import Discount from "../models/discountModel.js";

// Get all orders for a canteen
export const getAllOrders = async (req, res) => {
  try {
    const { canteenId, status, startDate, endDate, orderType } = req.query;

    const filter = {};
    if (canteenId) filter.canteen = canteenId;
    if (status) filter.orderStatus = status;
    if (orderType) filter.orderType = orderType;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(filter)
      .populate("items.menuItem", "itemName category")
      .populate("discount.discountCode", "code name")
      .populate("processedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// Get a single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.menuItem", "itemName category price")
      .populate("discount.discountCode", "code name type value")
      .populate("processedBy", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    // Validate menu items and calculate totals
    const { items, canteen, discount } = req.body;
    let subtotal = 0;

    for (let item of items) {
      const menuItem = await Menu.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item ${item.menuItem} not found` });
      }
      if (!menuItem.isAvailable) {
        return res.status(400).json({ message: `${menuItem.itemName} is not available` });
      }

      item.itemName = menuItem.itemName;
      item.price = menuItem.price;
      item.subtotal = item.quantity * item.price;
      subtotal += item.subtotal;

      // Update popularity score
      menuItem.popularityScore += 1;
      await menuItem.save();
    }

    // Apply discount if provided
    let discountAmount = 0;
    if (discount && discount.discountCode) {
      const discountDoc = await Discount.findById(discount.discountCode);
      if (discountDoc && discountDoc.isActive) {
        if (discountDoc.type === "percentage") {
          discountAmount = (subtotal * discountDoc.value) / 100;
          if (discountDoc.maxDiscountAmount && discountAmount > discountDoc.maxDiscountAmount) {
            discountAmount = discountDoc.maxDiscountAmount;
          }
        } else {
          discountAmount = discountDoc.value;
        }

        // Update discount usage count
        discountDoc.usageCount += 1;
        await discountDoc.save();
      }
    }

    const orderData = {
      ...req.body,
      items,
      subtotal,
      discount: { ...discount, amount: discountAmount },
      totalAmount: subtotal + (req.body.tax || 0) - discountAmount,
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(400).json({ message: "Error updating order", error: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;

    // Record actual preparation time when order is completed
    if (status === "completed" && order.createdAt) {
      const now = new Date();
      order.actualPreparationTime = Math.round((now - order.createdAt) / 60000); // in minutes
    }

    await order.save();
    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(400).json({ message: "Error updating order status", error: error.message });
  }
};

// Get order statistics
export const getOrderStatistics = async (req, res) => {
  try {
    const { canteenId, startDate, endDate } = req.query;

    const filter = { canteen: canteenId };
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const orders = await Order.find(filter);

    const stats = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      averageOrderValue: 0,
      ordersByStatus: {},
      ordersByType: {},
      ordersByPaymentMethod: {},
    };

    if (stats.totalOrders > 0) {
      stats.averageOrderValue = stats.totalRevenue / stats.totalOrders;
    }

    // Count by status
    orders.forEach((order) => {
      stats.ordersByStatus[order.orderStatus] =
        (stats.ordersByStatus[order.orderStatus] || 0) + 1;
      stats.ordersByType[order.orderType] = (stats.ordersByType[order.orderType] || 0) + 1;
      stats.ordersByPaymentMethod[order.paymentMethod] =
        (stats.ordersByPaymentMethod[order.paymentMethod] || 0) + 1;
    });

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error: error.message });
  }
};
