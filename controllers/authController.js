import userModel from "../models/userModel.js";
import canteenModel from "../models/canteenModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, canteenNames } = req.body;

    // Validations
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!role) {
      return res.status(400).send({ message: "Role is required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Find canteens
    let canteenIds = [];
    if (canteenNames && canteenNames.length > 0) {
      const canteens = await canteenModel.find({ name: { $in: canteenNames } });
      if (canteens.length === 0) {
        return res.status(400).send({ message: "No valid canteens found" });
      }
      canteenIds = canteens.map(canteen => canteen._id);
    }
    
    // Create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      canteens: canteenIds,
    });

    await user.save();
    
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validations
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    // Find user and populate canteens
    const user = await userModel.findOne({ email }).populate('canteens');
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        canteens: user.canteens,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
}

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId).populate('canteens');
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        canteens: user.canteens,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching user profile",
      error,
    });
  }
}

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await userModel.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).send({ message: "Email already in use" });
      }
      user.email = email;
    }
    if (password) {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
    }

    await user.save();

    const updatedUser = await userModel.findById(userId).populate('canteens');

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        canteens: updatedUser.canteens,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating user profile",
      error,
    });
  }
}

// Get staff members by canteen
export const getStaffMembers = async (req, res) => {
  try {
    const { canteenId } = req.query;

    if (!canteenId) {
      return res.status(400).send({ message: "Canteen ID is required" });
    }

    const staffMembers = await userModel
      .find({ canteens: canteenId, role: "staff" })
      .populate('canteens');

    res.status(200).send(staffMembers);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching staff members",
      error,
    });
  }
}

// Create staff member
export const createStaffMember = async (req, res) => {
  try {
    const { name, email, password, role, canteens, metadata } = req.body;

    // Validations
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!canteens || canteens.length === 0) {
      return res.status(400).send({ message: "At least one canteen is required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new staff member
    const staff = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "staff",
      canteens,
      metadata,
    });

    await staff.save();

    const populatedStaff = await userModel.findById(staff._id).populate('canteens');

    res.status(201).send({
      success: true,
      message: "Staff member created successfully",
      staff: populatedStaff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error creating staff member",
      error,
    });
  }
}

// Update staff member
export const updateStaffMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, canteens, metadata } = req.body;

    const staff = await userModel.findById(id);
    if (!staff) {
      return res.status(404).send({ message: "Staff member not found" });
    }

    // Update fields
    if (name) staff.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await userModel.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).send({ message: "Email already in use" });
      }
      staff.email = email;
    }
    if (role) staff.role = role;
    if (canteens) staff.canteens = canteens;
    if (metadata) staff.metadata = metadata;

    await staff.save();

    const updatedStaff = await userModel.findById(id).populate('canteens');

    res.status(200).send({
      success: true,
      message: "Staff member updated successfully",
      staff: updatedStaff,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating staff member",
      error,
    });
  }
}

// Delete staff member
export const deleteStaffMember = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await userModel.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).send({ message: "Staff member not found" });
    }

    res.status(200).send({
      success: true,
      message: "Staff member deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error deleting staff member",
      error,
    });
  }
}