import mongoose from "mongoose";

const canteenSchema = new mongoose.Schema(
    {
        name:{
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
            ref: "Users",
            required: true
        }],
        staff: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }],
    }
);
export default mongoose.model("Canteen", canteenSchema);