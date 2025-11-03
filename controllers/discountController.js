import Discount from "../models/discountModel.js";

// Get all discounts for a canteen
export const getAllDiscounts = async (req, res) => {
  try {
    const { canteenId } = req.query;
    if (!canteenId) {
      return res.status(400).json({ message: "Canteen ID is required" });
    }

    const discounts = await Discount.find({ canteen: canteenId })
      .populate("applicableToItems", "itemName price")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discounts", error: error.message });
  }
};

// Get a single discount
export const getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id)
      .populate("applicableToItems", "itemName price")
      .populate("createdBy", "name email");

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: "Error fetching discount", error: error.message });
  }
};

// Create a new discount
export const createDiscount = async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json({ message: "Discount created successfully", discount });
  } catch (error) {
    res.status(400).json({ message: "Error creating discount", error: error.message });
  }
};

// Update a discount
export const updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    res.status(200).json({ message: "Discount updated successfully", discount });
  } catch (error) {
    res.status(400).json({ message: "Error updating discount", error: error.message });
  }
};

// Delete a discount
export const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting discount", error: error.message });
  }
};

// Validate and apply discount
export const validateDiscount = async (req, res) => {
  try {
    const { code, orderValue, canteenId } = req.body;

    const discount = await Discount.findOne({
      code: code.toUpperCase(),
      canteen: canteenId,
      isActive: true,
    });

    if (!discount) {
      return res.status(404).json({ message: "Invalid discount code" });
    }

    const now = new Date();
    if (now < discount.startDate || now > discount.endDate) {
      return res.status(400).json({ message: "Discount code has expired or not yet active" });
    }

    if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
      return res.status(400).json({ message: "Discount usage limit reached" });
    }

    if (orderValue < discount.minOrderValue) {
      return res.status(400).json({
        message: `Minimum order value of ₹${discount.minOrderValue} required`,
      });
    }

    let discountAmount = 0;
    if (discount.type === "percentage") {
      discountAmount = (orderValue * discount.value) / 100;
      if (discount.maxDiscountAmount && discountAmount > discount.maxDiscountAmount) {
        discountAmount = discount.maxDiscountAmount;
      }
    } else {
      discountAmount = discount.value;
    }

    res.status(200).json({
      valid: true,
      discountAmount,
      discount: {
        id: discount._id,
        code: discount.code,
        name: discount.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error validating discount", error: error.message });
  }
};
