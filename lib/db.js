import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const uri = process.env.MONGO_URI;

  if (!uri) throw new Error("❌ MONGO_URI is missing in .env");

  try {
    await mongoose.connect(uri, {
      dbName: "bezeyada"
    });

    console.log("🔥 MongoDB Connected Successfully");
  } catch (err) {
    console.log("❌ DB Connection Error:", err);
  }
};
