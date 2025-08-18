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
      canteenIds,
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

    // Find user
    const user = await userModel.findOne({ email });
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