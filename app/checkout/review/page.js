"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function ReviewPage() {
  const { cart, total } = useCart();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (cart.length === 0) router.push("/cart");

    const u = localStorage.getItem("bz-user");
    const p = localStorage.getItem("bz-payment");

    if (!u) router.push("/checkout/details");
    if (!p) router.push("/checkout/payment");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(JSON.parse(u || "{}"));
    setPayment(p || "");
  }, []);

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/dark-wood.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <h1 className="text-center text-5xl font-extrabold mb-14 text-red-600">
        مراجعة الطلب
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Customer Data */}
        <div className="bg-[#121212] p-6 rounded-xl border border-red-900/40 shadow">
          <h3 className="text-3xl font-bold text-red-500 mb-4">
            بيانات العميل
          </h3>

          <p className="text-lg mb-1">
            <span className="text-red-400">الاسم:</span> {user.name}
          </p>
          <p className="text-lg mb-1">
            <span className="text-red-400">الجوال:</span> {user.phone}
          </p>
          <p className="text-lg mb-1">
            <span className="text-red-400">العنوان:</span> {user.address}
          </p>
        </div>

        {/* Cart Items */}
        <div className="bg-[#121212] p-6 rounded-xl border border-red-900/40 shadow">
          <h3 className="text-3xl font-bold text-red-500 mb-4">الطلبات</h3>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-red-900/20 pb-3 mb-3"
            >
              <span className="text-lg">
                {item.name} × {item.qty}
              </span>

              <span className="text-red-500 font-bold text-lg">
                {item.price * item.qty} ريال
              </span>
            </div>
          ))}

          <p className="text-3xl font-bold mt-4">
            الإجمالي: <span className="text-red-500">{total} ريال</span>
          </p>
        </div>

        {/* Payment */}
        <div className="bg-[#121212] p-6 rounded-xl border border-red-900/40 shadow">
          <h3 className="text-3xl font-bold text-red-500 mb-4">الدفع</h3>

          <p className="text-lg">
            {payment === "cash" ? "الدفع عند الاستلام" : "دفع إلكتروني"}
          </p>
        </div>

        {/* Confirm */}
        <button
          onClick={() => router.push("/checkout/success")}
          className="
            w-full py-4 rounded-full
            bg-red-600 hover:bg-red-700
            text-white font-extrabold text-xl
            mt-6 shadow-lg
            hover:scale-105 active:scale-95 transition
          "
        >
          تأكيد الطلب
        </button>
      </div>
    </motion.div>
  );
}
