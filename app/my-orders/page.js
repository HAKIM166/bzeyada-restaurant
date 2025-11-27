/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { addons } from "@/lib/addonsData"; // ⭐ ضروري

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("bz-orders") || "[]");

    const unique = Array.from(new Map(list.map((o) => [o.id, o])).values());
    const valid = unique.filter((o) => Date.now() < o.expiresAt);

    setOrders(valid);
    localStorage.setItem("bz-orders", JSON.stringify(valid));
  }, []);

  const deleteOrder = (id) => {
    const filtered = orders.filter((o) => o.id !== id);
    setOrders(filtered);
    localStorage.setItem("bz-orders", JSON.stringify(filtered));
  };

  /* ✅ دالة تجيب اسم الإضافة المجانية */
  const getFreeAddonName = (free) => {
    if (typeof free === "string" || typeof free === "number") {
      for (const group of addons) {
        const found = group.items.find((it) => it.id === free);
        if (found) return found.name;
      }
      return free; // fallback
    }
    return free?.name || "";
  };

  const calcPaidAddons = (item) =>
    item.paidAddons?.reduce((sum, addon) => sum + addon.qty * addon.price, 0) ||
    0;

  const calcItemSubtotal = (item) => {
    const base = Number(item.finalPrice ?? item.price ?? 0);
    const addons = calcPaidAddons(item);
    return (base + addons) * item.qty;
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10">
        <h1 className="text-center text-5xl font-extrabold mb-12 text-red-600 drop-shadow-lg">
          طلبــاتــي 🧾
        </h1>

        {orders.length === 0 && (
          <p className="text-center text-gray-300 text-xl">
            لا يوجد طلبات محفوظة حالياً.
          </p>
        )}

        <div className="max-w-2xl mx-auto space-y-6 mt-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#131313]/90 p-6 border border-red-900/40 rounded-xl shadow-xl"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-500">
                  رقم الطلب: {order.id}
                </h2>

                <span className="text-gray-300 text-sm">
                  {new Date(order.createdAt).toLocaleString("ar-EG")}
                </span>
              </div>

              {/* CUSTOMER INFO */}
              <div className="mb-4 text-gray-200 text-sm">
                <p><span className="text-red-400">الاسم:</span> {order.user?.name}</p>
                <p><span className="text-red-400">الجوال:</span> {order.user?.phone}</p>
                <p><span className="text-red-400">الاستلام:</span> {order.user?.deliveryMethod}</p>
                <p><span className="text-red-400">العنوان:</span> {order.user?.address}</p>
              </div>

              {/* ITEMS */}
              <h3 className="text-xl font-bold text-red-500 mb-3">الطلبات:</h3>

              {!order.cart || order.cart.length === 0 ? (
                <p className="text-gray-400 text-sm">لا يوجد تفاصيل للطلب.</p>
              ) : (
                order.cart.map((item) => (
                  <div
                    key={item.uniqueId}
                    className="border-b border-white/10 mb-3 pb-3"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-white font-bold">{item.name}</h4>
                      <span className="text-red-500 font-bold">
                        {calcItemSubtotal(item)} ريال
                      </span>
                    </div>

                    <p className="text-sm text-gray-400">الكمية: {item.qty}</p>
                    <p className="text-sm text-gray-400">
                      السعر الأساسي: {item.finalPrice ?? item.price} ريال
                    </p>

                    {/* FREE ADDONS */}
                    {item.freeAddons?.length > 0 && (
                      <div className="mt-1 text-green-400 text-sm">
                        إضافات مجانية:
                        <ul className="ml-4 text-white">
                          {item.freeAddons.map((free, i) => (
                            <li key={i}>• {getFreeAddonName(free)}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* PAID ADDONS */}
                    {item.paidAddons?.length > 0 && (
                      <div className="mt-1 text-red-400 text-sm">
                        إضافات مدفوعة:
                        <ul className="ml-4 text-white">
                          {item.paidAddons.map((addon) => (
                            <li key={addon.id}>
                              • {addon.name} × {addon.qty} — {addon.qty * addon.price} ريال
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.note && (
                      <p className="text-yellow-300 text-sm mt-1">
                        ملاحظات: {item.note}
                      </p>
                    )}
                  </div>
                ))
              )}

              {/* TOTAL */}
              <p className="text-2xl font-bold mt-4">
                الإجمالي:{" "}
                <span className="text-red-500">{order.total} ريال</span>
              </p>

              {/* DELETE */}
              <button
                onClick={() => deleteOrder(order.id)}
                className="
                  w-full mt-5 py-3 rounded-lg
                  bg-red-800 hover:bg-red-900 
                  text-white font-bold
                  hover:scale-105 active:scale-95 transition
                "
              >
                حذف الطلب
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
