import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["canteenOwner", "staff"],
        },
        canteens: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Canteen",
            }
        ]
    }
)
export default mongoose.model("Users", userSchema);
