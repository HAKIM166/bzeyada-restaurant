"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast";

const validateSaudiPhone = (phone) => /^05\d{8}$/.test(phone);

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrors({});

    if (!validateSaudiPhone(phone)) {
      setErrors({
        phone: "❌ رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrors({ form: data.message });
        return;
      }

      showToast("📩 تم إرسال رمز التحقق إلى رقمك");

      localStorage.setItem("bz-temp-login", JSON.stringify({ phone }));
      router.push("/auth/verify-login");
      
    } catch (err) {
      showToast("⚠ خطأ في الاتصال بالخادم");
      setErrors({ form: "⚠ تعذر الاتصال بالخادم" });
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white px-6 py-20 bg-[url('/assets/wood1.jpg')] bg-cover bg-center bg-fixed"
    >
      <div className="max-w-md mx-auto bg-black/70 p-8 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-center text-4xl font-extrabold text-red-500 mb-10">
          تسجيل الدخول
        </h1>

        {/* Phone Input */}
        <div className="mb-4">
          <input
            type="tel"
            placeholder="رقم الجوال (05xxxxxxxx)"
            className="w-full p-4 rounded-xl bg-[#111] border border-white/10 focus:border-red-500 outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {errors.form && (
          <p className="text-red-400 text-center mb-4 font-bold">
            {errors.form}
          </p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-xl font-bold active:scale-95 transition"
        >
          {loading ? "جاري الإرسال..." : "إرسال كود الدخول"}
        </button>

        <p className="text-center text-gray-300 mt-6">
          ليس لديك حساب؟
          <a href="/auth/register" className="text-red-400 font-bold ml-1">
            إنشاء حساب جديد
          </a>
        </p>
      </div>
    </motion.div>
  );
}
