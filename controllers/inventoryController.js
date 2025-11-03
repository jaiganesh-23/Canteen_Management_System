import Inventory from "../models/inventoryModel.js";

// Get all inventory items for a canteen
export const getAllInventory = async (req, res) => {
  try {
    const { canteenId } = req.query;
    if (!canteenId) {
      return res.status(400).json({ message: "Canteen ID is required" });
    }

    const inventory = await Inventory.find({ canteen: canteenId })
      .populate("supplier", "name contactPerson phone")
      .populate("createdBy", "name email")
      .sort({ itemName: 1 });

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};

// Get low stock items
export const getLowStockItems = async (req, res) => {
  try {
    const { canteenId } = req.query;
    if (!canteenId) {
      return res.status(400).json({ message: "Canteen ID is required" });
    }

    const inventory = await Inventory.find({ canteen: canteenId })
      .populate("supplier", "name contactPerson phone")
      .sort({ currentStock: 1 });

    const lowStockItems = inventory.filter((item) => item.currentStock <= item.reorderPoint);

    res.status(200).json(lowStockItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching low stock items", error: error.message });
  }
};

// Get a single inventory item
export const getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id)
      .populate("supplier", "name contactPerson phone email")
      .populate("createdBy", "name email");

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory item", error: error.message });
  }
};

// Create a new inventory item
export const createInventory = async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json({ message: "Inventory item created successfully", item });
  } catch (error) {
    res.status(400).json({ message: "Error creating inventory item", error: error.message });
  }
};

// Update an inventory item
export const updateInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json({ message: "Inventory item updated successfully", item });
  } catch (error) {
    res.status(400).json({ message: "Error updating inventory item", error: error.message });
  }
};

// Delete an inventory item
export const deleteInventory = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item", error: error.message });
  }
};

// Update stock level
export const updateStock = async (req, res) => {
  try {
    const { quantity, operation } = req.body; // operation: 'add' or 'subtract'

    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    if (operation === "add") {
      item.currentStock += quantity;
      item.lastRestocked = new Date();
    } else if (operation === "subtract") {
      if (item.currentStock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      item.currentStock -= quantity;
    } else {
      return res.status(400).json({ message: "Invalid operation" });
    }

    await item.save();
    res.status(200).json({ message: "Stock updated successfully", item });
  } catch (error) {
    res.status(400).json({ message: "Error updating stock", error: error.message });
  }
};
