"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function PaymentPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [selected, setSelected] = useState("cash");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (cart.length === 0) router.push("/cart");
  }, [cart]);

  const handleNext = () => {
    localStorage.setItem("bz-payment", selected);
    router.push("/checkout/review");
  };

  const handleCardClick = () => {
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-28 relative">
      
      {/* POPUP */}
      {showWarning && (
        <div
          className="
            absolute top-10 left-1/2 -translate-x-1/2
            bg-red-600 text-white px-6 py-3 rounded-xl
            shadow-xl text-lg font-bold animate-pulse
          "
        >
          ⚠️ الدفع الإلكتروني غير متاح حالياً
        </div>
      )}

      <h1 className="text-center text-5xl font-extrabold text-red-600 mb-14">
        اختيار طريقة الدفع
      </h1>

      <div className="max-w-2xl mx-auto space-y-6">

        {/* Cash */}
        <label
          className="
            flex items-center gap-3 cursor-pointer p-5 
            rounded-xl bg-[#121212] border border-red-900/40
            hover:border-red-600 transition
          "
        >
          <input
            type="radio"
            checked={selected === "cash"}
            onChange={() => setSelected("cash")}
          />
          <span className="text-xl font-bold">الدفع عند الاستلام</span>
        </label>

        {/* Card (disabled) */}
        <label
          onClick={handleCardClick}
          className="
            flex items-center gap-3 cursor-pointer p-5 
            rounded-xl bg-[#121212]/70 border border-red-900/20
            opacity-70
          "
        >
          <input type="radio" disabled />
          <span className="text-xl">دفع إلكتروني (غير متوفر حالياً)</span>
        </label>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="
            w-full py-4 rounded-full bg-red-600 hover:bg-red-700 
            text-white font-extrabold text-xl mt-6
            hover:scale-105 active:scale-95 transition
          "
        >
          متابعة مراجعة الطلب
        </button>
      </div>
    </div>
  );
}
