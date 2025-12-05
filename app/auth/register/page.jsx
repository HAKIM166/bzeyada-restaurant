"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast"; // ← إضافة التوست

const validateSaudiPhone = (phone) => /^05\d{8}$/.test(phone);
const validateName = (name) => name.trim().split(" ").length >= 2;

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast(); // ← تفعيل التوست

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    form: "",
  });

  const resetErrors = () =>
    setErrors({ name: "", phone: "", form: "" });

  const handleRegister = async () => {
    resetErrors();

    let hasError = false;

    if (!validateName(name)) {
      setErrors((e) => ({
        ...e,
        name: "❌ أدخل اسم صحيح مكوّن من كلمتين",
      }));
      hasError = true;
    }

    if (!validateSaudiPhone(phone)) {
      setErrors((e) => ({
        ...e,
        phone: "❌ رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام",
      }));
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrors((e) => ({ ...e, form: data.message }));
        return;
      }

      // 🎯 حفظ بيانات التسجيل مؤقتاً
      localStorage.setItem(
        "bz-temp-register",
        JSON.stringify({ name, phone })
      );

      // 🎉 Toast
      showToast("📩 تم إرسال كود التفعيل");

      // ✔️ الإنتقال لصفحة OTP
      router.push("/auth/otp");

    } catch (err) {
      setErrors((e) => ({
        ...e,
        form: "⚠ حدث خطأ أثناء الاتصال بالخادم",
      }));
      showToast("⚠ لا يمكن الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-20
        bg-[url('/assets/wood1.jpg')] bg-cover bg-center bg-fixed
      "
    >
      <div className="max-w-md mx-auto bg-black/70 p-8 rounded-2xl shadow-xl border border-white/10">

        <h1 className="text-center text-4xl font-extrabold text-red-500 mb-10">
          إنشاء حساب جديد
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="الاسم الكامل"
            className="w-full p-4 rounded-xl bg-[#111] border border-white/10 focus:border-red-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            placeholder="رقم الجوال (05xxxxxxxx)"
            className="w-full p-4 rounded-xl bg-[#111] border border-white/10 focus:border-red-500 outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        {errors.form && (
          <p className="text-red-400 text-center mb-4 font-bold">{errors.form}</p>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-xl font-bold active:scale-95 transition"
        >
          {loading ? "جاري الإرسال…" : "إرسال كود التحقق"}
        </button>

        <p className="text-center text-gray-300 mt-6">
          لديك حساب بالفعل؟{" "}
          <a href="/auth/login" className="text-red-400 font-bold">
            تسجيل الدخول
          </a>
        </p>
      </div>
    </motion.div>
  );
}
