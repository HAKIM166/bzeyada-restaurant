/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  // Generate order ID
  // eslint-disable-next-line react-hooks/purity
  const orderId = Math.floor(10000 + Math.random() * 90000);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("bz-orders") || "[]");

    orders.push({
      id: orderId,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      status: "active",
    });

    localStorage.setItem("bz-orders", JSON.stringify(orders));

    localStorage.removeItem("bz-cart");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/wood1.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">
          🎉 تم إرسال طلبك بنجاح!
        </h1>

        <p className="text-gray-300 text-xl mb-6">
          سيتم التواصل معك قريباً لتأكيد الطلب
        </p>

        <p className="text-gray-300 text-xl mb-10">
          رقم طلبك هو:{" "}
          <span className="text-red-500 font-extrabold">{orderId}</span>
        </p>

        <a
          href="/"
          className="
            px-12 py-4 rounded-full text-xl font-bold
            bg-red-600 hover:bg-red-700
            text-white shadow-lg
            hover:scale-105 active:scale-95 transition
          "
        >
          الرجوع للصفحة الرئيسية
        </a>
      </div>
    </motion.div>
  );
}
