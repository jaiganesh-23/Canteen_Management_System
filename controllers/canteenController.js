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