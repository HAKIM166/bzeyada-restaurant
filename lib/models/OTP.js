import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    required: true,
  }
});

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
