import userModel from "../models/userModel.js";
import canteenModel from "../models/canteenModel.js";
import mondayBreakfastMenuItemsModel from "../models/mondayBreakfastMenuItems.js";
import mondayLunchMenuItemsModel from "../models/mondayLunchMenuItems.js";
import mondayEveningSnacksMenuItemsModel from "../models/mondayEveningSnacksMenuItems.js";
import mondayDinnerMenuItemsModel from "../models/mondayDinnerMenuItems.js";
import tuesdayBreakfastMenuItemsModel from "../models/tuesdayBreakfastMenuItems.js";
import tuesdayLunchMenuItemsModel from "../models/tuesdayLunchMenuItems.js";
import tuesdayEveningSnacksMenuItemsModel from "../models/tuesdayEveningSnacksMenuItems.js";
import tuesdayDinnerMenuItemsModel from "../models/tuesdayDinnerMenuItems.js";
import wednesdayBreakfastMenuItemsModel from "../models/wednesdayBreakfastMenuItems.js";
import wednesdayLunchMenuItemsModel from "../models/wednesdayLunchMenuItems.js";
import wednesdayEveningSnacksMenuItemsModel from "../models/wednesdayEveningSnacksMenuItems.js";
import wednesdayDinnerMenuItemsModel from "../models/wednesdayDinnerMenuItems.js";
import thursdayBreakfastMenuItemsModel from "../models/thursdayBreakfastMenuItems.js";
import thursdayLunchMenuItemsModel from "../models/thursdayLunchMenuItems.js";
import thursdayEveningSnacksMenuItemsModel from "../models/thursdayEveningSnacksMenuItems.js";
import thursdayDinnerMenuItemsModel from "../models/thursdayDinnerMenuItems.js";
import fridayBreakfastMenuItemsModel from "../models/fridayBreakfastMenuItems.js";
import fridayLunchMenuItemsModel from "../models/fridayLunchMenuItems.js";
import fridayEveningSnacksMenuItemsModel from "../models/fridayEveningSnacksMenuItems.js";
import fridayDinnerMenuItemsModel from "../models/fridayDinnerMenuItems.js";
import saturdayBreakfastMenuItemsModel from "../models/saturdayBreakfastMenuItems.js";
import saturdayLunchMenuItemsModel from "../models/saturdayLunchMenuItems.js";
import saturdayEveningSnacksMenuItemsModel from "../models/saturdayEveningSnacksMenuItems.js";
import saturdayDinnerMenuItemsModel from "../models/saturdayDinnerMenuItems.js";
import sundayBreakfastMenuItemsModel from "../models/sundayBreakfastMenuItems.js";
import sundayLunchMenuItemsModel from "../models/sundayLunchMenuItems.js";
import sundayEveningSnacksMenuItemsModel from "../models/sundayEveningSnacksMenuItems.js";
import sundayDinnerMenuItemsModel from "../models/sundayDinnerMenuItems.js";


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

export const registerMenuItem = async (req, res) => {
  try {
    const { canteenId, day, mealType, itemName, price, tax, category, description } = req.body;
    const canteen = await canteenModel.findById(canteenId);
    if (!canteen) {
      return res.status(404).send({ message: "Canteen not found" });
    }
    let MenuItemModel;

    // Determine the correct model based on day and mealType
    if (day === "Monday") {
      if (mealType === "Breakfast") MenuItemModel = mondayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = mondayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = mondayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = mondayDinnerMenuItemsModel;
    } else if (day === "Tuesday") {
      if (mealType === "Breakfast") MenuItemModel = tuesdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = tuesdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = tuesdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = tuesdayDinnerMenuItemsModel;
    } else if (day === "Wednesday") {
      if (mealType === "Breakfast") MenuItemModel = wednesdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = wednesdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = wednesdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = wednesdayDinnerMenuItemsModel;
    } else if (day === "Thursday") {
      if (mealType === "Breakfast") MenuItemModel = thursdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = thursdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = thursdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = thursdayDinnerMenuItemsModel;
    } else if (day === "Friday") {
      if (mealType === "Breakfast") MenuItemModel = fridayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = fridayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = fridayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = fridayDinnerMenuItemsModel;
    } else if (day === "Saturday") {
      if (mealType === "Breakfast") MenuItemModel = saturdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = saturdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = saturdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = saturdayDinnerMenuItemsModel;
    } else if (day === "Sunday") {
      if (mealType === "Breakfast") MenuItemModel = sundayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = sundayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = sundayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = sundayDinnerMenuItemsModel;
    }
    if (!MenuItemModel) {
      return res.status(400).send({ message: "Invalid day or meal type" });
    }
    // Create new menu item
    const menuItem = new MenuItemModel({
      itemName,
      price,
      tax,
      category,
      description
    });
    await menuItem.save();
    res.status(201).send({
      success: true,
      message: "Menu item registered successfully",
      menuItem:{
        itemName: menuItem.itemName,
        price: menuItem.price,
        tax: menuItem.tax,
        category: menuItem.category,
        description: menuItem.description
      },
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registering menu item",
      error,
    });
  }
}

export const getMenuItems = async (req, res) => {
  try {
    const { day, mealType } = req.body;
    let MenuItemModel;
    // Determine the correct model based on day and mealType
    if (day === "Monday") {
      if (mealType === "Breakfast") MenuItemModel = mondayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = mondayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = mondayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = mondayDinnerMenuItemsModel;
    } else if (day === "Tuesday") {
      if (mealType === "Breakfast") MenuItemModel = tuesdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = tuesdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = tuesdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = tuesdayDinnerMenuItemsModel;
    } else if (day === "Wednesday") {
      if (mealType === "Breakfast") MenuItemModel = wednesdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = wednesdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = wednesdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = wednesdayDinnerMenuItemsModel;
    } else if (day === "Thursday") {
      if (mealType === "Breakfast") MenuItemModel = thursdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = thursdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = thursdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = thursdayDinnerMenuItemsModel;
    } else if (day === "Friday") {
      if (mealType === "Breakfast") MenuItemModel = fridayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = fridayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = fridayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = fridayDinnerMenuItemsModel;
    } else if (day === "Saturday") {
      if (mealType === "Breakfast") MenuItemModel = saturdayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = saturdayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = saturdayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = saturdayDinnerMenuItemsModel;
    } else if (day === "Sunday") {
      if (mealType === "Breakfast") MenuItemModel = sundayBreakfastMenuItemsModel;
      else if (mealType === "Lunch") MenuItemModel = sundayLunchMenuItemsModel;
      else if (mealType === "Evening Snacks") MenuItemModel = sundayEveningSnacksMenuItemsModel;
      else if (mealType === "Dinner") MenuItemModel = sundayDinnerMenuItemsModel;
    }
    if (!MenuItemModel) {
      return res.status(400).send({ message: "Invalid day or meal type" });
    }
    const menuItems = await MenuItemModel.find({});
    res.status(200).send({
      success: true,
      message: "Menu items fetched successfully",
      menuItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching menu items",
      error,
    });
  }
}

export const addNewCanteen = async (req, res) => {
  try {
    const { name, owners, staffs } = req.body;
    owners.map(async (ownerEmailId) => {
      const owner = await userModel.findOne({ email: ownerEmailId });
      if (!owner) {
        return res.status(404).send({ message: `Owner with email ${ownerEmailId} not found` });
      }
      if (owner.role !== "canteenOwner") {
        return res.status(400).send({ message: `User with email ${ownerEmailId} is not a canteen owner` });
      }
      return owner._id;
    });
    staffs.map(async (staffEmailId) => {
      const staff = await userModel.findOne({ email: staffEmailId });
      if (!staff) {
        return res.status(404).send({ message: `Staff with email ${staffEmailId} not found` });
      }
      if (staff.role !== "staff") {
        return res.status(400).send({ message: `User with email ${staffEmailId} is not a staff` });
      }
      return staff._id;
    });
    const canteen = new canteenModel({
      name,
      owners,
      staffs
    });
    await canteen.save();
    res.status(201).send({
      success: true,
      message: "Canteen added successfully",
      canteen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding canteen",
      error,
    });
  }
}

    

