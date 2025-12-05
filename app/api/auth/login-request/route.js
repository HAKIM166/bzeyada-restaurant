import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";
import { sendOTP } from "@/lib/sendOTP";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({
        success: false,
        message: "أدخل رقم الجوال",
      });
    }

    await connectDB();

    // هل المستخدم موجود؟
    const exists = await User.findOne({ phone });
    if (!exists) {
      return NextResponse.json({
        success: false,
        message: "هذا الرقم غير مسجل",
      });
    }

    // امسح أي كود قديم
    await OTP.deleteMany({ phone });

    // إنشاء كود OTP جديد
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await OTP.create({
      phone,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await sendOTP(phone, otp);

    return NextResponse.json({ success: true, message: "تم إرسال كود الدخول" });

  } catch (err) {
    console.error("LOGIN OTP ERROR:", err);
    return NextResponse.json({
      success: false,
      message: "خطأ بالخادم",
    });
  }
}
