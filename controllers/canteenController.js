import userModel from "../models/userModel.js";
import canteenModel from "../models/canteenModel.js";

export const registerCanteen = async (req, res) => {
  try {
    const { name, location, owners } = req.body;

    // Validations
    if (!name) {
      return res.status(400).send({ message: "Canteen name is required" });
    }
    if (!location) {
      return res.status(400).send({ message: "Canteen location is required" });
    }
    if (!owners || owners.length === 0) {
      return res.status(400).send({ message: "At least one owner is required" });
    }

    // Check if owners exist
    const ownerUsers = await userModel.find({ _id: { $in: owners } });
    if (ownerUsers.length !== owners.length) {
      return res.status(400).send({ message: "Some owners do not exist" });
    }
    // Check if owners are canteen owners
    const ownerRoles = ownerUsers.map(user => user.role);
    if (ownerRoles.some(role => role !== "canteenOwner")) {
    return res.status(400).send({ message: "All owners must be canteen owners" });
    }
    // Get owner IDs
    const ownerIds = ownerUsers.map(user => user._id);

    // Check if canteen already exists
    const existingCanteen = await canteenModel.findOne({ name });
    if (existingCanteen) {
      return res.status(200).send({
        success: false,
        message: "Canteen already registered",
      });
    }

    // Create new canteen
    const canteen = new canteenModel({
      name,
      location,
      owners: ownerIds,
    });

    await canteen.save();

    // Update user's canteens array
    await userModel.updateMany(
      { _id: { $in: ownerIds } },
      { $addToSet: { canteens: canteen._id } }
    );

    res.status(201).send({
      success: true,
      message: "Canteen registered successfully",
      canteen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registering canteen",
      error,
    });
  }
}

// Get all canteens for a user
export const getCanteensByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId).populate('canteens');
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      success: true,
      canteens: user.canteens,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching canteens",
      error,
    });
  }
}

// Get a single canteen by ID
export const getCanteenById = async (req, res) => {
  try {
    const { canteenId } = req.params;

    const canteen = await canteenModel.findById(canteenId)
      .populate('owners', 'name email role')
      .populate('staff', 'name email role');

    if (!canteen) {
      return res.status(404).send({ message: "Canteen not found" });
    }

    res.status(200).send({
      success: true,
      canteen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching canteen",
      error,
    });
  }
}

// Update canteen details
export const updateCanteen = async (req, res) => {
  try {
    const { canteenId } = req.params;
    const { name, location } = req.body;

    const canteen = await canteenModel.findById(canteenId);
    if (!canteen) {
      return res.status(404).send({ message: "Canteen not found" });
    }

    if (name) canteen.name = name;
    if (location) canteen.location = location;

    await canteen.save();

    const updatedCanteen = await canteenModel.findById(canteenId)
      .populate('owners', 'name email role')
      .populate('staff', 'name email role');

    res.status(200).send({
      success: true,
      message: "Canteen updated successfully",
      canteen: updatedCanteen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating canteen",
      error,
    });
  }
}

// Add staff to canteen
export const addStaffToCanteen = async (req, res) => {
  try {
    const { canteenId } = req.params;
    const { staffIds } = req.body;

    if (!staffIds || staffIds.length === 0) {
      return res.status(400).send({ message: "Staff IDs are required" });
    }

    const canteen = await canteenModel.findById(canteenId);
    if (!canteen) {
      return res.status(404).send({ message: "Canteen not found" });
    }

    // Verify staff users exist
    const staffUsers = await userModel.find({ _id: { $in: staffIds } });
    if (staffUsers.length !== staffIds.length) {
      return res.status(400).send({ message: "Some staff users do not exist" });
    }

    // Add staff to canteen
    staffIds.forEach(staffId => {
      if (!canteen.staff.includes(staffId)) {
        canteen.staff.push(staffId);
      }
    });

    await canteen.save();

    // Update staff users' canteens array
    await userModel.updateMany(
      { _id: { $in: staffIds } },
      { $addToSet: { canteens: canteenId } }
    );

    const updatedCanteen = await canteenModel.findById(canteenId)
      .populate('owners', 'name email role')
      .populate('staff', 'name email role');

    res.status(200).send({
      success: true,
      message: "Staff added to canteen successfully",
      canteen: updatedCanteen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding staff to canteen",
      error,
    });
  }
}

// Remove staff from canteen
export const removeStaffFromCanteen = async (req, res) => {
  try {
    const { canteenId, staffId } = req.params;

    const canteen = await canteenModel.findById(canteenId);
    if (!canteen) {
      return res.status(404).send({ message: "Canteen not found" });
    }

    // Remove staff from canteen
    canteen.staff = canteen.staff.filter(id => id.toString() !== staffId);
    await canteen.save();

    // Remove canteen from staff user's canteens array
    await userModel.findByIdAndUpdate(staffId, {
      $pull: { canteens: canteenId }
    });

    const updatedCanteen = await canteenModel.findById(canteenId)
      .populate('owners', 'name email role')
      .populate('staff', 'name email role');

    res.status(200).send({
      success: true,
      message: "Staff removed from canteen successfully",
      canteen: updatedCanteen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error removing staff from canteen",
      error,
    });
  }
}