/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  // Generate random order number
  // eslint-disable-next-line react-hooks/purity
  const orderId = Math.floor(10000 + Math.random() * 90000);

  useEffect(() => {
    // 1) نحفظ الطلب في orders
    const orders = JSON.parse(localStorage.getItem("bz-orders") || "[]");

    orders.push({
      id: orderId,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 HOURS
      status: "active",
    });

    localStorage.setItem("bz-orders", JSON.stringify(orders));

    // 2) نفرّغ السلة بعد تسجيل الطلب
    localStorage.removeItem("bz-cart");
  }, []);
  

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold text-[#fce4b7] mb-6">
        🎉 تم إرسال طلبك بنجاح!
      </h1>

      <p className="text-gray-300 text-xl mb-10">
        سيتم التواصل معك قريباً لتأكيد الطلب
      </p>

      <p className="text-gray-300 text-xl mb-10">
        رقم طلبك هو: <span className="text-[#fce4b7] font-bold">{orderId}</span>
      </p>

      <a
        href="/"
        className="px-10 py-4 rounded-full text-lg font-bold bg-gradient-to-r 
        from-[#d4a755] to-[#fce4b7] text-black shadow-lg hover:scale-105 active:scale-95 transition"
      >
        الرجوع للصفحة الرئيسية
      </a>
    </div>
  );
}
