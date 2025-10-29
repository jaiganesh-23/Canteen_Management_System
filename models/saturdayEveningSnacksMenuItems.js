import mongoose from "mongoose";

const saturdayEveningSnacksMenuItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
    },
    tax: {
        type: Number,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    }
});

export default mongoose.model("SaturdayEveningSnacksMenuItems", saturdayEveningSnacksMenuItemSchema);
