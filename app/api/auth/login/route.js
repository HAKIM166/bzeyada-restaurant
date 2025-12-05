import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import OTP from "@/lib/models/OTP";
import { sendOTP } from "@/lib/sendOTP";

export async function POST(req) {
  try {
    const { phone } = await req.json();
    await connectDB();

    // هل المستخدم موجود بالفعل؟
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "لا يوجد حساب بهذا الرقم"
      });
    }

    // إنشاء كود
    const otp = Math.floor(100000 + Math.random() * 900000);

    // حفظ كود جديد (ولو قديم يمسحه)
    await OTP.deleteMany({ phone });
    await OTP.create({
      phone,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 دقائق
    });

    // إرسال OTP باستخدام Twilio
    await sendOTP(phone, otp);

    return NextResponse.json({
      success: true,
      message: "تم إرسال كود التحقق",
    });

  } catch (err) {
    console.error("LOGIN OTP ERROR:", err);
    return NextResponse.json(
      { success: false, message: "خطأ بالخادم" },
      { status: 500 }
    );
  }
}
