/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();
  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get("orderId");
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.replace("/");
      return;
    }

    const user = JSON.parse(localStorage.getItem("bz-user") || "{}");
    if (!user?._id) {
      router.replace("/auth/login");
      return;
    }

    if (!cleared) {
      clearCart();
      localStorage.removeItem("bz-cart");

      // لا نمسح payment أو delivery إلا لو اتسجل الطلب فعلاً
      // لكن حالياً نحتفظ بيهم لأن Track قد يحتاجهم
      
      // حفظ آخر رقم طلب
      localStorage.setItem("last-order", orderId);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCleared(true);
    }
  }, [orderId, cleared, clearCart, router]);

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
      <div className="text-center max-w-2xl mx-auto">

        <h1 className="text-5xl font-extrabold text-red-600 mb-4 drop-shadow-lg">
          🎉 تم إرسال طلبك بنجاح!
        </h1>

        <p className="text-gray-300 text-xl mb-4">
          شكراً لك! سيتم التواصل معك قريباً لتأكيد الطلب.
        </p>

        <p className="text-gray-300 text-xl mb-10">
          رقم طلبك هو:
          <span className="text-red-500 font-extrabold"> {orderId}</span>
        </p>

        <a
          href={`/track?orderId=${orderId}`}
          className="
            block w-full max-w-sm mx-auto 
            px-12 py-4 rounded-full text-xl font-bold text-white
            bg-green-600 hover:bg-green-700 shadow-lg
            hover:scale-105 active:scale-95 transition
            mb-6
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
