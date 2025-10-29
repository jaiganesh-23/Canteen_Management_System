import mongoose from "mongoose";

const sundayEveningSnacksMenuItemSchema = new mongoose.Schema({
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

export default mongoose.model("SundayEveningSnacksMenuItems", sundayEveningSnacksMenuItemSchema);
