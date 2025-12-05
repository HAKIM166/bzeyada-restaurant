import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";
import { sendOTP } from "@/lib/sendOTP";

export async function POST(req) {
  try {
    const { phone, name } = await req.json();

    if (!phone || !name) {
      return NextResponse.json({
        success: false,
        message: "بيانات غير مكتملة",
      });
    }

    await connectDB();

    const exists = await User.findOne({ phone });
    if (exists) {
      return NextResponse.json({
        success: false,
        message: "هذا الرقم مسجل مسبقاً",
      });
    }

    await OTP.deleteMany({ phone });

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digits

    await OTP.create({
      phone,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOTP(phone, otp);

    return NextResponse.json({ success: true, message: "تم إرسال الكود" });
  } catch (err) {
    console.error("REGISTER OTP ERROR:", err);
    return NextResponse.json({
      success: false,
      message: "خطأ بالخادم",
    });
  }
}
