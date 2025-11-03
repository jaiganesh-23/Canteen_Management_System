import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "l", "ml", "pcs", "dozen", "box", "packet"],
    },
    currentStock: {
      type: Number,
      required: true,
      min: 0,
    },
    minStockLevel: {
      type: Number,
      required: true,
      min: 0,
    },
    maxStockLevel: {
      type: Number,
      required: true,
      min: 0,
    },
    reorderPoint: {
      type: Number,
      required: true,
      min: 0,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    lastRestocked: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    storageLocation: {
      type: String,
      trim: true,
    },
    canteen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Canteen",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field to check if stock is low
inventorySchema.virtual("isLowStock").get(function () {
  return this.currentStock <= this.reorderPoint;
});

// Virtual field to check if stock is critical
inventorySchema.virtual("isCriticalStock").get(function () {
  return this.currentStock <= this.minStockLevel;
});

// Ensure virtuals are included in JSON
inventorySchema.set("toJSON", { virtuals: true });
inventorySchema.set("toObject", { virtuals: true });

export default mongoose.model("Inventory", inventorySchema);
