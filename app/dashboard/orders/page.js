"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OrderDetailsModal from "../components/OrderDetailsModal";

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== Fetch Orders from MongoDB ==========
  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/orders/list");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders.reverse()); // أحدث طلب فوق
      }
    } catch (err) {
      console.log("FETCH ORDERS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleString("ar-EG", {
      hour12: true,
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/seamless-dark-wooden.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-center text-5xl font-extrabold mb-12 text-red-600 drop-shadow-lg">
          لوحة إدارة الطلبات
        </h1>

        {/* TABLE */}
        <div className="bg-[#111]/90 p-6 rounded-2xl border border-white/10 shadow-xl">
          {loading ? (
            <p className="text-gray-400 text-center py-6">
              جاري تحميل الطلبات...
            </p>
          ) : (
            <table className="w-full text-center text-white">
              <thead>
                <tr className="text-red-400 border-b border-white/10">
                  <th className="p-3">رقم الطلب</th>
                  <th className="p-3">الاسم</th>
                  <th className="p-3">الجوال</th>
                  <th className="p-3">طريقة الاستلام</th>
                  <th className="p-3">السعر</th>
                  <th className="p-3">الوقت</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-6 text-gray-400">
                      لا يوجد طلبات حالياً.
                    </td>
                  </tr>
                )}

                {orders.map((o) => (
                  <tr
                    key={o._id}
                    onClick={() => setSelected(o)}
                    className="
                      border-b border-white/5 cursor-pointer hover:bg-white/5
                      transition h-14
                    "
                  >
                    <td className="py-2 font-extrabold text-red-500">
                      #{o._id}
                    </td>
                    <td>{o.user?.name}</td>
                    <td>{o.user?.phone}</td>
                    <td>
                      {o.user?.deliveryMethod === "pickup"
                        ? "استلام"
                        : "توصيل"}
                    </td>
                    <td className="font-bold text-red-400">
                      {o.total} ريال
                    </td>
                    <td className="text-sm text-gray-300">
                      {formatDate(o.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* MODAL */}
        {selected && (
          <OrderDetailsModal
            order={selected}
            onClose={() => setSelected(null)}
            refresh={loadOrders} // مهم جداً لتحديث الجدول بعد تغيير حالة الطلب
          />
        )}
      </div>
    </motion.div>
  );
}
