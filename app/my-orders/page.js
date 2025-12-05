"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [addons, setAddons] = useState({ free: [], paid: [] });
  const [loading, setLoading] = useState(true);

  // مدة صلاحية الطلب المحلي = ساعتين
  const EXPIRY_TIME = 2 * 60 * 60 * 1000;

  // ================================
  // تنظيف الطلبات القديمة من localStorage
  // ================================
  const cleanExpiredOrders = () => {
    let mock = JSON.parse(localStorage.getItem("mock-orders") || "[]");

    const now = Date.now();
    const filtered = mock.filter((o) => now - o.createdAt < EXPIRY_TIME);

    localStorage.setItem("mock-orders", JSON.stringify(filtered));

    return filtered;
  };

  // ================================
  // LOAD ORDERS (API + mock fallback)
  // ================================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bz-user") || "{}");

    if (!user?._id) {
      window.location.href = "/auth/login";
      return;
    }

    async function loadAll() {
      try {
        // نظّف الطلبات القديمة أولاً
        const cleanedMock = cleanExpiredOrders();

        const [ordersRes, addonsRes] = await Promise.all([
          fetch(`/api/orders/user/${user._id}`)
            .then((r) => r.json())
            .catch(() => null),
          fetch("/api/addons")
            .then((r) => r.json())
            .catch(() => null),
        ]);

        let finalOrders = [];

        // لو الـ API شغال
        if (ordersRes?.success && ordersRes.orders?.length > 0) {
          finalOrders = ordersRes.orders;
        } else {
          // fallback → mock orders
          finalOrders = cleanedMock.filter((o) => o.user?.phone === user.phone);
        }

        setOrders(finalOrders);

        if (addonsRes?.success) setAddons(addonsRes.data);
      } catch (err) {
        console.log("Load error:", err);

        // fallback النهائي
        const cleanedMock = cleanExpiredOrders();
        setOrders(cleanedMock);
      }

      setLoading(false);
    }

    loadAll();
  }, []);

  // ================================
  // ADDON NAME FINDER
  // ================================
  const getAddonName = (id) => {
    const f = addons.free.find((a) => a.id == id);
    if (f) return f.name;

    const p = addons.paid.find((a) => a.id == id);
    if (p) return p.name;

    return id;
  };

  // ================================
  // PRICE HANDLING
  // ================================
  const calcPaidAddons = (item) =>
    item.paidAddons?.reduce((sum, addon) => sum + addon.qty * addon.price, 0) ||
    0;

  const calcItemSubtotal = (item) => {
    const base = Number(item.basePrice ?? item.price ?? 0);
    return (base + calcPaidAddons(item)) * item.qty;
  };

  // ================================
  // STATUS UI
  // ================================
  const getStatusUI = (status) => {
    switch (status) {
      case "pending":
        return { text: "✔ تم استلام الطلب", color: "text-yellow-300" };
      case "preparing":
        return { text: "🥘 جاري التجهيز", color: "text-orange-300" };
      case "delivering":
        return { text: "🛵 خرج للتوصيل", color: "text-blue-300" };
      case "done":
        return { text: "🎉 تم التسليم", color: "text-green-400" };
      default:
        return { text: "—", color: "text-gray-400" };
    }
  };

  // ================================
  // UI
  // ================================
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/seamless-dark-wooden.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-center text-5xl font-extrabold mb-12 text-red-600 drop-shadow-lg">
          طلبــاتــي
        </h1>

        {loading && (
          <p className="text-center text-gray-300 text-xl">جاري التحميل…</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-300 text-xl">
            لا يوجد طلبات محفوظة.
          </p>
        )}

        <div className="space-y-8">
          {orders.map((order) => {
            const status = getStatusUI(order.status);
            const isPickup = order.user.deliveryMethod === "pickup";

            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#111]/90 p-6 rounded-2xl border border-white/10 shadow-xl"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold text-red-500">
                    #{order._id}
                  </h2>
                  <span className="text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleString("ar-EG")}
                  </span>
                </div>

                {/* STATUS */}
                <p className={`font-bold mb-4 ${status.color}`}>
                  {status.text}
                </p>

                {/* USER INFO */}
                <div className="bg-[#1a1a1a] p-4 rounded-xl border border-white/5 space-y-2 text-sm">
                  <p>
                    <span className="text-red-400">الاسم:</span>{" "}
                    {order.user.name}
                  </p>
                  <p>
                    <span className="text-red-400">الجوال:</span>{" "}
                    {order.user.phone}
                  </p>
                  <p>
                    <span className="text-red-400">طريقة الاستلام:</span>{" "}
                    {isPickup ? "استلام من الفرع" : "توصيل"}
                  </p>
                  {!isPickup && (
                    <p>
                      <span className="text-red-400">العنوان:</span>{" "}
                      {order.user.address}
                    </p>
                  )}
                </div>

                {/* ITEMS */}
                <div className="mt-5 space-y-4">
                  <h3 className="text-xl font-bold text-red-500">
                    تفاصيل الطلب:
                  </h3>

                  {order.cart.map((item) => {
                    const trueBase = item.basePrice ?? item.price ?? null;
                    const subtotal = calcItemSubtotal(item);

                    return (
                      <div
                        key={item.uniqueId}
                        className="bg-[#161616] p-4 rounded-xl border border-white/5"
                      >
                        {/* اسم المنتج + السعر الأساسي (أحمر واضح) */}
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-white">{item.name}</h4>

                          {trueBase && (
                            <span className="text-red-500 font-bold text-lg">
                              {trueBase} ريال
                            </span>
                          )}
                        </div>

                        {/* الكمية */}
                        <p className="text-gray-400 text-xs mb-1">
                          الكمية: {item.qty}
                        </p>

                        {/* إضافات مجانية */}
                        {item.freeAddons?.length > 0 && (
                          <div className="text-green-400 text-xs mt-1">
                            إضافات مجانية:
                            <ul className="ml-4 text-white">
                              {item.freeAddons.map((id, i) => (
                                <li key={i}>• {getAddonName(id)}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* إضافات مدفوعة */}
                        {item.paidAddons?.length > 0 && (
                          <div className="text-red-400 text-xs mt-1">
                            إضافات مدفوعة:
                            <ul className="ml-4 text-white">
                              {item.paidAddons.map((add) => (
                                <li key={add.id}>
                                  • {getAddonName(add.id)} × {add.qty} —{" "}
                                  {add.qty * add.price} ريال
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* ❌ تم حذف "إجمالي المنتج" لتجنب التكرار */}
                      </div>
                    );
                  })}
                </div>

                <p className="text-2xl font-bold mt-4">
                  الإجمالي:{" "}
                  <span className="text-red-500">{order.total} ريال</span>
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
