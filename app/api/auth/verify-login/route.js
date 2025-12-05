import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({
        success: false,
        message: "بيانات غير مكتملة",
      });
    }

    await connectDB();

    // هل يوجد OTP صحيح؟
    const record = await OTP.findOne({ phone, otp });

    if (!record) {
      return NextResponse.json({
        success: false,
        message: "❌ كود غير صحيح",
      });
    }

    // احذف OTP بعد الاستخدام
    await OTP.deleteMany({ phone });

    // هل المستخدم موجود؟
    const user = await User.findOne({ phone });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    return NextResponse.json({
      success: true,
      message: "✔ تم تسجيل الدخول بنجاح",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      }
    });

  } catch (err) {
    console.error("VERIFY LOGIN ERROR:", err);
    return NextResponse.json({
      success: false,
      message: "⚠ خطأ في الخادم",
    });
  }
}
