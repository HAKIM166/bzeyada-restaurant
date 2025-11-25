"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [selected, setSelected] = useState("cash");
  const [showWarning, setShowWarning] = useState(false); // ⭐ عرض رسالة الاحترافية

  useEffect(() => {
    if (cart.length === 0) router.push("/cart");
  }, [cart]);

  const handleNext = () => {
    localStorage.setItem("bz-payment", selected);
    router.push("/checkout/review");
  };

  const handleCardClick = () => {
    setShowWarning(true);

    // بعد 3 ثواني الرسالة تختفي
    setTimeout(() => setShowWarning(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      
      {/* ⭐ Popup احترافي */}
      {showWarning && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 
          bg-[#d4a755]/90 text-black px-6 py-3 rounded-xl shadow-xl 
          text-lg font-bold animate-pulse">
          ⚠️ الدفع الإلكتروني غير متاح حالياً
        </div>
      )}

      <h1 className="text-center text-4xl font-bold text-[#fce4b7] mb-10">
        اختيار طريقة الدفع
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">

        {/* الدفع عند الاستلام */}
        <label className="flex items-center gap-3 bg-[#1a1a1a] p-4 rounded-xl cursor-pointer">
          <input
            type="radio"
            checked={selected === "cash"}
            onChange={() => setSelected("cash")}
          />
          الدفع عند الاستلام
        </label>

        {/* دفع إلكتروني (غير متوفر) */}
        <label
          className="flex items-center gap-3 bg-[#1a1a1a] p-4 rounded-xl cursor-pointer opacity-70"
          onClick={handleCardClick}
        >
          <input type="radio" disabled /> 
          دفع إلكتروني (غير متوفر حالياً)
        </label>

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4a755] 
          to-[#fce4b7] text-black font-bold text-lg mt-6 hover:scale-105 transition-all"
        >
          متابعة مراجعة الطلب
        </button>
      </div>
    </div>
  );
}
