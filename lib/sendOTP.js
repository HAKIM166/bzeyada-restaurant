export async function sendOTP(phone, otp) {
  try {
    // ⭐ وضع التطوير — بدون Twilio
    if (process.env.NODE_ENV !== "production") {
      console.log("🔵 OTP (DEV MODE) →", phone, ":", otp);
      return true;
    }

    // ⭐ وضع التشغيل الحقيقي Production
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const formattedPhone = "+966" + phone.slice(1);

    const message = await client.messages.create({
      body: `رمز التحقق الخاص بك هو: ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: formattedPhone,
    });

    console.log("OTP sent:", message.sid);
    return true;

  } catch (err) {
    console.error("SMS ERROR:", err);
    return false;
  }
}
