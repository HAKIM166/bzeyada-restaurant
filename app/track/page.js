"use client";

import { useState, useEffect } from "react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const steps = [
    { status: "pending", text: "📥 تم استلام الطلب" },
    { status: "preparing", text: "🥘 جاري التجهيز" },
    { status: "delivering", text: "🛵 خرج للتوصيل" },
    { status: "delivering", text: "🚚 في الطريق الآن" },
    { status: "done", text: "🎉 تم التسليم" },
  ];

  // -----------------------------
  // 🔍 Search order (API + fallback)
  // -----------------------------
  const search = async () => {
    setError("");
    setOrder(null);

    if (!orderId.trim()) {
      setError("❌ أدخل رقم الطلب");
      return;
    }

    // 1) حاول عبر API
    try {
      const res = await fetch(`/api/orders/${orderId}`);

      if (res.ok) {
        const data = await res.json();

        if (data.success && data.order) {
          setOrder(data.order);
          return;
        }
      }
    } catch (_) {}

    // 2) لو API مش شغال → fallback localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("mock-orders") || "[]");

      const found = stored.find((o) => String(o._id) === String(orderId));

      if (found) {
        setOrder(found);
        return;
      }
    } catch (_) {}

    // 3) لو مفيش API ومفيش Local
    setError("❌ رقم الطلب غير موجود");
  };

  // Determine current stage
  const getStageIndex = (status) => {
    switch (status) {
      case "pending":
        return 0;
      case "preparing":
        return 1;
      case "delivering":
        return 2;
      case "done":
        return 4;
      default:
        return 0;
    }
  };

  const stage = order ? getStageIndex(order.status) : 0;

  return (
    <div
      className="
        min-h-screen text-white p-6 pt-28 relative
        bg-[url('/assets/kababNar.png')] 
        bg-cover bg-center bg-fixed
      "
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10">

        <h1 className="text-center text-4xl font-extrabold mb-10 text-red-400 drop-shadow-md">
          تتبع طلبك
        </h1>

        <div className="max-w-xl mx-auto bg-black/60 border border-white/10 rounded-2xl p-6 shadow-lg">

          {/* Input */}
          <input
            className="
              w-full p-4 rounded-xl
              bg-[#0f0f0f] text-white 
              border border-white/10
              focus:border-red-500 outline-none transition
              mb-4
            "
            placeholder="أدخل رقم الطلب"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={search}
            className="
              w-full py-3 rounded-xl
              bg-red-600 hover:bg-red-700 
              text-white font-bold text-lg
              hover:scale-[1.02] active:scale-95 transition
            "
          >
            تتبع الطلب
          </button>

          {error && (
            <p className="text-red-400 text-center mt-4 font-bold">{error}</p>
          )}

          {/* Order Details */}
          {order && (
            <>
              <div className="mt-6 p-4 rounded-xl bg-[#111]/60 border border-white/10 space-y-2 text-sm">
                <p><span className="text-red-400 font-bold">رقم الطلب:</span> {order._id}</p>
                <p><span className="text-red-400 font-bold">الاسم:</span> {order.user?.name}</p>
                <p><span className="text-red-400 font-bold">الجوال:</span> {order.user?.phone}</p>
                <p>
                  <span className="text-red-400 font-bold">طريقة الاستلام:</span>{" "}
                  {order.user?.deliveryMethod === "pickup" ? "استلام من الفرع" : "توصيل للموقع"}
                </p>
                <p><span className="text-red-400 font-bold">التكلفة:</span> {order.total} ريال</p>
                <p>
                  <span className="text-red-400 font-bold">التاريخ:</span>{" "}
                  {new Date(order.createdAt).toLocaleString("ar-EG")}
                </p>
              </div>

              {/* Steps */}
              <div className="mt-6 space-y-4">
                {steps.map((step, i) => {
                  const isDone = i < stage;
                  const isCurrent = i === stage;

                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`
                          w-10 h-10 flex items-center justify-center rounded-full text-lg transition 
                          ${
                            isDone ? "bg-green-600" :
                            isCurrent ? "bg-red-600 animate-pulse" :
                            "bg-gray-600"
                          }
                        `}
                      >
                        {isDone ? "✔" : isCurrent ? "⏳" : "●"}
                      </div>

                      <span
                        className={`text-base transition ${
                          isCurrent ? "text-red-400 font-bold" : "text-gray-300"
                        }`}
                      >
                        {step.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
