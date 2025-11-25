/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  // Load Orders
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("bz-orders") || "[]");

    // Remove duplicates (same ID)
    const unique = Array.from(new Map(list.map(o => [o.id, o])).values());

    // Remove expired
    const validOrders = unique.filter((o) => Date.now() < o.expiresAt);

    setOrders(validOrders);
    localStorage.setItem("bz-orders", JSON.stringify(validOrders));
  }, []);

  // Delete Order
  const deleteOrder = (id) => {
    const filtered = orders.filter((o) => o.id !== id);
    setOrders(filtered);
    localStorage.setItem("bz-orders", JSON.stringify(filtered));
  };

  // Order progress text
  const getStatus = (order) => {
    const minutes = Math.floor((Date.now() - order.createdAt) / 60000);

    if (minutes < 10) return "تم استلام الطلب";
    if (minutes < 25) return "جاري التجهيز";
    if (minutes < 40) return "خرج للتوصيل";
    if (minutes < 45) return "في الطريق الآن";
    return "تم التسليم";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/seamless-dark-wooden.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-5xl font-extrabold mb-12 text-red-600 drop-shadow-lg"
        >
          طلبــاتــي 🧾
        </motion.h1>

        {/* Empty */}
        {orders.length === 0 && (
          <p className="text-center text-gray-300 text-xl">
            لا يوجد طلبات محفوظة حالياً.
          </p>
        )}

        {/* Orders List */}
        <div className="max-w-2xl mx-auto space-y-6 mt-6">

          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
                bg-[#131313]/85 backdrop-blur-md 
                border border-red-900/40 
                rounded-xl p-6 shadow-xl
              "
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-500">
                  رقم الطلب: {order.id}
                </h2>

                <span className="text-green-400 text-sm font-bold">
                  {getStatus(order)}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">

                <a
                  href={`/track?order=${order.id}`}
                  className="
                    flex-1 py-3 rounded-lg text-center font-bold text-white
                    bg-red-600 hover:bg-red-700 
                    hover:scale-105 active:scale-95 transition
                  "
                >
                  تتبع الطلب
                </a>

                <button
                  onClick={() => deleteOrder(order.id)}
                  className="
                    px-5 py-3 bg-red-800 hover:bg-red-900 
                    rounded-lg text-white font-bold
                    hover:scale-105 active:scale-95 transition
                  "
                >
                  حذف
                </button>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </motion.div>
  );
}
