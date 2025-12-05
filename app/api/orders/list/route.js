import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({ createdAt: -1 });

    return Response.json({ success: true, orders });
  } catch (err) {
    console.log("ORDERS LIST ERROR:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
