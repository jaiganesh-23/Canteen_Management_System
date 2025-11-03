import Menu from "../models/menuModel.js";

// Get all menu items for a canteen
export const getAllMenuItems = async (req, res) => {
  try {
    const { canteenId, category, isAvailable } = req.query;

    const filter = {};
    if (canteenId) filter.canteen = canteenId;
    if (category) filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === "true";

    const menuItems = await Menu.find(filter)
      .populate("ingredients.inventoryItem", "itemName unit")
      .populate("createdBy", "name email")
      .sort({ category: 1, itemName: 1 });

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items", error: error.message });
  }
};

// Get a single menu item
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id)
      .populate("ingredients.inventoryItem", "itemName unit currentStock")
      .populate("createdBy", "name email");

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu item", error: error.message });
  }
};

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    await menuItem.save();
    res.status(201).json({ message: "Menu item created successfully", menuItem });
  } catch (error) {
    res.status(400).json({ message: "Error creating menu item", error: error.message });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item updated successfully", menuItem });
  } catch (error) {
    res.status(400).json({ message: "Error updating menu item", error: error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error: error.message });
  }
};

// Toggle menu item availability
export const toggleAvailability = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();

    res.status(200).json({
      message: `Menu item ${menuItem.isAvailable ? "enabled" : "disabled"} successfully`,
      menuItem,
    });
  } catch (error) {
    res.status(400).json({ message: "Error toggling availability", error: error.message });
  }
};

// Get popular menu items
export const getPopularItems = async (req, res) => {
  try {
    const { canteenId, limit = 10 } = req.query;

    const filter = {};
    if (canteenId) filter.canteen = canteenId;

    const popularItems = await Menu.find(filter)
      .sort({ popularityScore: -1 })
      .limit(parseInt(limit))
      .populate("createdBy", "name");

    res.status(200).json(popularItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular items", error: error.message });
  }
};
