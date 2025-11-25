/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("bz-orders") || "[]");

    // إزالة الطلبات المنتهية
    const validOrders = list.filter((o) => Date.now() < o.expiresAt);

    setOrders(validOrders);

    // حفظ بعد التنظيف
    localStorage.setItem("bz-orders", JSON.stringify(validOrders));
  }, []);

  const deleteOrder = (id) => {
    const filtered = orders.filter((o) => o.id !== id);
    setOrders(filtered);
    localStorage.setItem("bz-orders", JSON.stringify(filtered));
  };

  const getStatus = (order) => {
    const minutes = Math.floor((Date.now() - order.createdAt) / 60000);

    if (minutes < 10) return "تم استلام الطلب";
    if (minutes < 25) return "جاري التجهيز";
    if (minutes < 40) return "خرج للتوصيل";
    if (minutes < 45) return "في الطريق الآن";
    return "تم التسليم";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-center text-4xl font-extrabold mb-8 bg-gradient-to-r
      from-[#d4a755] to-[#fce4b7] bg-clip-text text-transparent">
        طلبــاتــي 🧾
      </h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-400 text-lg">
          لا يوجد طلبات محفوظة حالياً.
        </p>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#191715] border border-[#2d2c2b] rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#fce4b7]">
                رقم الطلب: {order.id}
              </h2>
              <span className="text-green-400 text-sm">{getStatus(order)}</span>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href={`/track?order=${order.id}`}
                className="flex-1 py-3 rounded-lg text-center font-bold
                bg-gradient-to-r from-[#d4a755] to-[#fce4b7] text-black hover:scale-105 transition"
              >
                تتبع الطلب
              </a>

              <button
                onClick={() => deleteOrder(order.id)}
                className="px-4 py-3 bg-red-700 hover:bg-red-800 rounded-lg text-white font-bold"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
