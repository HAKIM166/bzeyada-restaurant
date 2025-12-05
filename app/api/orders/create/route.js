import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { userId, cart, total, deliveryMethod, address, coords, payment } = body;

    // 1) Validations
    if (!userId || !cart || !total) {
      return Response.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // 2) Find user
    const user = await User.findById(userId);

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 3) Create order
    const order = await Order.create({
      user: {
        userId: user._id,
        name: user.name,
        phone: user.phone,
        deliveryMethod,
        address: address || "",
        coords: coords || null,
      },
      cart,
      total,
      payment: payment || "cash",
      status: "pending",
    });

    // 4) Response
    return Response.json({
      success: true,
      orderId: order._id,
    });

  } catch (err) {
    console.log("ORDER ERROR:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
