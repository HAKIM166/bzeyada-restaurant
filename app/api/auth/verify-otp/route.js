import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { phone, otp, name } = await req.json();

    if (!phone || !otp || !name) {
      return NextResponse.json({
        success: false,
        message: "بيانات غير مكتملة",
      });
    }

    await connectDB();

    // 1) ابحث عن الكود
    const otpRecord = await OTP.findOne({ phone });
    if (!otpRecord) {
      return NextResponse.json({
        success: false,
        message: "لا يوجد طلب تحقق لهذا الرقم",
      });
    }

    // 2) تحقق من الكود
    if (otpRecord.otp !== otp) {
      return NextResponse.json({
        success: false,
        message: "كود غير صحيح",
      });
    }

    // 3) تحقق من الصلاحية
    if (otpRecord.expiresAt < Date.now()) {
      await OTP.deleteMany({ phone });
      return NextResponse.json({
        success: false,
        message: "انتهت صلاحية الكود",
      });
    }

    // 4) إنشاء المستخدم
    const user = await User.create({ name, phone });

    // 5) حذف الكود
    await OTP.deleteMany({ phone });

    // 6) عمل توكن
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return NextResponse.json({
      success: true,
      user,
      token,
    });

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return NextResponse.json({
      success: false,
      message: "خطأ بالخادم",
    });
  }
}
