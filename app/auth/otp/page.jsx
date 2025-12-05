"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

export default function OTPPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const temp = JSON.parse(localStorage.getItem("bz-temp-register") || "{}");

  useEffect(() => {
    if (!temp?.phone) router.replace("/auth/register");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (i, value) => {
    if (!/^\d?$/.test(value)) return;

    const newArr = [...digits];
    newArr[i] = value;
    setDigits(newArr);

    if (value !== "" && i < 3) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && digits[i] === "" && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(text)) {
      setDigits(text.split(""));
      inputsRef.current[3]?.focus();
    }
  };

  const verifyOTP = async () => {
    const code = digits.join("");
    if (code.length !== 4) {
      showToast("❌ أدخل الكود بالكامل (4 أرقام)");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: temp.phone,
          name: temp.name,
          otp: code,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        showToast(data.message || "❌ كود غير صحيح");
        return;
      }

      localStorage.setItem(
        "bz-user",
        JSON.stringify({
          _id: data.user._id,
          name: data.user.name,
          phone: data.user.phone,
          token: data.token,
        })
      );

      localStorage.removeItem("bz-temp-register");

      showToast("✅ تم التحقق بنجاح");
      router.push("/profile");
    } catch (err) {
      showToast("⚠ خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (timer > 0) return;

    setTimer(60);

    await fetch("/api/auth/register-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: temp.phone, name: temp.name }),
    });

    showToast("🔄 تم إرسال كود جديد");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-white px-6 py-20 bg-[url('/assets/wood1.jpg')] bg-cover bg-center bg-fixed"
    >
      <div className="max-w-md mx-auto bg-black/70 p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm">

        <h1 className="text-center text-4xl font-extrabold text-red-500 mb-1">
          التحقق من رقم الجوال
        </h1>

        <p className="text-center text-gray-300 mb-8">
          تم إرسال كود التفعيل إلى:
          <span className="text-red-400 font-bold"> {temp.phone} </span>
        </p>

        {/* OTP BOXES */}
        <div
          className="flex justify-between mb-6"
          style={{ direction: "ltr" }}   // 🚀 يمنع وراثة RTL
          onPaste={handlePaste}
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="
                w-14 h-16 rounded-xl text-2xl font-bold bg-[#111]
                border border-white/10 focus:border-red-600 outline-none
              "
              style={{
                direction: "ltr",
                unicodeBidi: "plaintext", // 🔥 أقوى حل
                fontFamily: "monospace",
                textAlign: "center",
              }}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
            />
          ))}
        </div>

        <button
          onClick={verifyOTP}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-xl font-bold active:scale-95 transition"
        >
          {loading ? "جاري التحقق…" : "تأكيد"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          {timer > 0 ? (
            <>
              إعادة الإرسال خلال{" "}
              <span className="text-red-400 font-bold">{timer}</span> ثانية
            </>
          ) : (
            <button
              onClick={resend}
              className="text-red-400 font-bold hover:underline"
            >
              إعادة إرسال الكود
            </button>
          )}
        </p>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-lg"
        >
          الرجوع
        </button>
      </div>
    </motion.div>
  );
}
