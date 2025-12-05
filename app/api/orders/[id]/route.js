import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const id = params.id;

    const order = await Order.findById(id);

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("ORDER LOOKUP ERROR:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
