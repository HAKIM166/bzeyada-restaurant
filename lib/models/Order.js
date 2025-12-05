import mongoose from "mongoose";

const AddonSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  qty: Number,
});

const CartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  img: String,
  price: Number,
  qty: Number,
  size: String,
  freeAddons: [String], 
  paidAddons: [AddonSchema],
  note: String,
  finalPrice: Number
});

const OrderSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      deliveryMethod: { type: String, required: true },
      address: String,
      coords: {
        lat: Number,
        lng: Number,
      },
    },

    cart: [CartItemSchema],

    total: { type: Number, required: true },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "preparing", "delivering", "done"],
    },

    payment: {
      type: String,
      default: "cash",
      enum: ["cash", "online"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
