import Supplier from "../models/supplierModel.js";

// Get all suppliers for a canteen
export const getAllSuppliers = async (req, res) => {
  try {
    const { canteenId, isActive } = req.query;

    const filter = {};
    if (canteenId) filter.canteen = canteenId;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const suppliers = await Supplier.find(filter)
      .populate("createdBy", "name email")
      .sort({ name: 1 });

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suppliers", error: error.message });
  }
};

// Get a single supplier
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id).populate("createdBy", "name email");

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: "Error fetching supplier", error: error.message });
  }
};

// Create a new supplier
export const createSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json({ message: "Supplier created successfully", supplier });
  } catch (error) {
    res.status(400).json({ message: "Error creating supplier", error: error.message });
  }
};

// Update a supplier
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier updated successfully", supplier });
  } catch (error) {
    res.status(400).json({ message: "Error updating supplier", error: error.message });
  }
};

// Delete a supplier
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting supplier", error: error.message });
  }
};

// Toggle supplier active status
export const toggleSupplierStatus = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    supplier.isActive = !supplier.isActive;
    await supplier.save();

    res.status(200).json({
      message: `Supplier ${supplier.isActive ? "activated" : "deactivated"} successfully`,
      supplier,
    });
  } catch (error) {
    res.status(400).json({ message: "Error toggling supplier status", error: error.message });
  }
};
