"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function OrderDetailsModal({ order, onClose, refresh }) {
  if (!order) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);

  const isPickup = order.user?.deliveryMethod === "pickup";

  const formatDate = (d) =>
    new Date(d).toLocaleString("ar-EG", {
      hour12: true,
      dateStyle: "short",
      timeStyle: "short",
    });

  // ========== UPDATE STATUS ==========
  const updateStatus = async (newStatus) => {
    try {
      setLoading(true);

      const res = await fetch("/api/orders/update-status", {
        method: "POST",
        body: JSON.stringify({
          id: order._id,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✔ تم تحديث حالة الطلب");

        refresh(); // إعادة تحميل الطلبات في dashboard
        onClose();
      } else {
        alert("❌ فشل تحديث الحالة");
      }
    } catch (err) {
      console.log(err);
      alert("⚠ خطأ أثناء تحديث الحالة");
    } finally {
      setLoading(false);
    }
  };
  // ====================================

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed inset-0 bg-black/70 backdrop-blur-md
          flex items-center justify-center z-50 px-4
        "
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="
            w-full max-w-2xl bg-[#111] p-6 rounded-2xl text-white
            border border-white/10 shadow-2xl
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-3xl font-bold text-red-500">
              تفاصيل الطلب #{order._id}
            </h2>

            <button
              onClick={onClose}
              className="text-white text-2xl hover:text-red-400"
            >
              ✖
            </button>
          </div>

          {/* Info */}
          <div className="space-y-3 bg-[#181818] p-4 rounded-xl border border-white/5">
            <p>
              <span className="text-red-400 font-bold">الحالة الحالية:</span>{" "}
              <span className="text-yellow-300">{order.status}</span>
            </p>

            <p>
              <span className="text-red-400 font-bold">الاسم:</span>{" "}
              {order.user?.name}
            </p>
            <p>
              <span className="text-red-400 font-bold">الجوال:</span>{" "}
              {order.user?.phone}
            </p>
            <p>
              <span className="text-red-400 font-bold">طريقة الاستلام:</span>{" "}
              {isPickup ? "استلام من الفرع" : "توصيل"}
            </p>
            {!isPickup && (
              <p>
                <span className="text-red-400 font-bold">العنوان:</span>{" "}
                {order.user?.address}
              </p>
            )}

            <p>
              <span className="text-red-400 font-bold">طريقة الدفع:</span>{" "}
              {order.payment === "cash"
                ? "الدفع عند الاستلام"
                : "دفع إلكتروني"}
            </p>

            <p>
              <span className="text-red-400 font-bold">وقت الطلب:</span>{" "}
              {formatDate(order.createdAt)}
            </p>
          </div>

          {/* Items */}
          <h3 className="text-2xl text-red-500 font-bold mt-6 mb-3">
            المنتجات:
          </h3>

          <div className="space-y-4">
            {order.cart?.map((item, i) => (
              <div
                key={i}
                className="bg-[#151515] p-4 rounded-xl border border-white/5"
              >
                <div className="flex justify-between">
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <span className="text-red-400 font-bold">
                    {item.qty} × {item.finalPrice || item.price} ريال
                  </span>
                </div>

                {item.freeAddons?.length > 0 && (
                  <p className="text-green-400 text-sm mt-1">
                    إضافات مجانية: {item.freeAddons.join("، ")}
                  </p>
                )}

                {item.paidAddons?.length > 0 && (
                  <div className="text-red-300 text-sm mt-1">
                    إضافات مدفوعة:
                    {item.paidAddons.map((ad) => (
                      <p key={ad.id}>
                        - {ad.name} × {ad.qty} = {ad.qty * ad.price} ريال
                      </p>
                    ))}
                  </div>
                )}

                {item.note && (
                  <p className="text-yellow-300 text-sm mt-2">
                    ملاحظات: {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Total */}
          <p className="text-3xl font-extrabold text-center mt-6">
            الإجمالي:{" "}
            <span className="text-red-500">{order.total} ريال</span>
          </p>

          {/* Status Buttons */}
          <div className="flex justify-between mt-8">
            <button
              disabled={loading}
              onClick={() => updateStatus("preparing")}
              className="px-5 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-xl font-bold"
            >
              بدء التجهيز
            </button>

            <button
              disabled={loading}
              onClick={() => updateStatus("delivering")}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold"
            >
              خرج للتوصيل
            </button>

            <button
              disabled={loading}
              onClick={() => updateStatus("done")}
              className="px-5 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-bold"
            >
              تم التسليم
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
