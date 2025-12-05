import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const userId = params.id;

    if (!userId) {
      return Response.json(
        { success: false, message: "Missing user ID" },
        { status: 400 }
      );
    }

    const orders = await Order.find({ "user._id": userId })
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      orders,
    });

  } catch (err) {
    console.error("ORDER USER ID ERROR:", err);
    return Response.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
