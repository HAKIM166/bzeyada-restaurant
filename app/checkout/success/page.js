/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { cart, total, clearCart } = useCart();

  // رقم الطلب العشوائي
  const orderId = Math.floor(10000 + Math.random() * 90000);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bz-user") || "{}");
    const payment = localStorage.getItem("bz-payment");

    const newOrder = {
      id: orderId,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 2, // الطلب صالح لمدة ساعتين

      user: {
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        deliveryMethod: user.deliveryMethod || "",
        coords: user.coords || null,
      },

      cart: cart || [],

      total: total || 0,

      payment: payment || "cash",
    };

    let all = JSON.parse(localStorage.getItem("bz-orders") || "[]");
    all.push(newOrder);

    localStorage.setItem("bz-orders", JSON.stringify(all));

    // مسح السلة بعد الحفظ
    clearCart();
    localStorage.removeItem("bz-cart");
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
