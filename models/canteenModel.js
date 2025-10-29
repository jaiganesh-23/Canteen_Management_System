import mongoose from "mongoose";

const canteenSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            trim: true
        },
        owners: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }],
        staff: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }],
        mondayBreakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "MondayBreakfastMenuItems" }],
        mondayLunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "MondayLunchMenuItems" }],
        mondayEveningSnacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "MondayEveningSnacksMenuItems" }],
        mondayDinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "MondayDinnerMenuItems" }],

        tuesdayBreakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "TuesdayBreakfastMenuItems" }],
        tuesdayLunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "TuesdayLunchMenuItems" }],
        tuesdayEveningSnacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "TuesdayEveningSnacksMenuItems" }],
        tuesdayDinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "TuesdayDinnerMenuItems" }],

        wednesdayBreakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "WednesdayBreakfastMenuItems" }],
        wednesdayLunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "WednesdayLunchMenuItems" }],
        wednesdayEveningSnacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "WednesdayEveningSnacksMenuItems" }],
        wednesdayDinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "WednesdayDinnerMenuItems" }],

        thursdayBreakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "ThursdayBreakfastMenuItems" }],
        thursdayLunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "ThursdayLunchMenuItems" }],
        thursdayEveningSnacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "ThursdayEveningSnacksMenuItems" }],
        thursdayDinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "ThursdayDinnerMenuItems" }],

        fridayBreakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "FridayBreakfastMenuItems" }],
        fridayLunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "FridayLunchMenuItems" }],
        fridayEveningSnacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "FridayEveningSnacksMenuItems" }],
        fridayDinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "FridayDinnerMenuItems" }],

        saturdayBreakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaturdayBreakfastMenuItems" }],
        saturdayLunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaturdayLunchMenuItems" }],
        saturdayEveningSnacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaturdayEveningSnacksMenuItems" }],
        saturdayDinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "SaturdayDinnerMenuItems" }],

        sundayBreakfast: [{ type: mongoose.Schema.Types.ObjectId, ref: "SundayBreakfastMenuItems" }],
        sundayLunch: [{ type: mongoose.Schema.Types.ObjectId, ref: "SundayLunchMenuItems" }],
        sundayEveningSnacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "SundayEveningSnacksMenuItems" }],
        sundayDinner: [{ type: mongoose.Schema.Types.ObjectId, ref: "SundayDinnerMenuItems" }]
    }
);
export default mongoose.model("Canteen", canteenSchema);