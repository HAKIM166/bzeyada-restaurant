/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const [orderId, setOrderId] = useState(null);
  const [cleared, setCleared] = useState(false);

  // قراءة orderId بعد hydration فقط
  useEffect(() => {
    const id = params.get("orderId");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrderId(id);

    if (!id) router.replace("/");
  }, [params, router]);

  // بعد توفر orderId → نفذ عمليات clearCart
  useEffect(() => {
    if (!orderId) return;

    const user = JSON.parse(localStorage.getItem("bz-user") || "{}");
    if (!user?._id) {
      router.replace("/auth/login");
      return;
    }

    if (!cleared) {
      clearCart();
      localStorage.removeItem("bz-cart");
      localStorage.setItem("last-order", orderId);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCleared(true);
    }
  }, [orderId, cleared, clearCart, router]);

  if (!orderId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-20
        bg-[url('/assets/wood1.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="text-center max-w-2xl mx-auto">

        <h1 className="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
          🎉 تم إرسال طلبك بنجاح!
        </h1>

        <p className="text-gray-300 text-xl mb-4">
          شكراً لك! سيتم التواصل معك قريباً لتأكيد الطلب.
        </p>

        <p className="text-gray-300 text-xl mb-10">
          رقم طلبك:
          <span className="text-red-500 font-extrabold"> {orderId}</span>
        </p>

        <a
          href={`/track?orderId=${orderId}`}
          className="
            block w-full max-w-sm mx-auto 
            px-12 py-4 rounded-full text-xl font-bold text-white
            bg-green-600 hover:bg-green-700 shadow-lg
            hover:scale-105 active:scale-95 transition mb-6
          "
        >
          تتبّع الطلب
        </a>

        <a
          href="/"
          className="
            block w-full max-w-sm mx-auto
            px-12 py-4 rounded-full text-xl font-bold
            bg-red-600 hover:bg-red-700
            text-white shadow-lg
            hover:scale-105 active:scale-95 transition
          "
        >
          الرجوع للرئيسية
        </a>

      </div>
    </motion.div>
  );
}
