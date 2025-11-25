"use client";

import { useEffect, useState } from "react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState("");

  const search = () => {
    const orders = JSON.parse(localStorage.getItem("bz-orders") || "[]");
    const found = orders.find((o) => o.id == orderId);

    if (!found) {
      setError("❌ رقم الطلب غير موجود");
      setOrder(null);
      return;
    }

    // eslint-disable-next-line react-hooks/purity
    if (Date.now() > found.expiresAt) {
      setError("⏳ انتهت صلاحية الطلب بعد 24 ساعة");
      setOrder(null);
      return;
    }

    setError("");
    setOrder(found);
    updateStage(found);
  };

  const updateStage = (ord) => {
    const minutes = Math.floor((Date.now() - ord.createdAt) / 60000);

    if (minutes < 10) setStage(0);
    else if (minutes < 25) setStage(1);
    else if (minutes < 40) setStage(2);
    else if (minutes < 45) setStage(3);
    else setStage(4);
  };

  const steps = [
    "تم استلام الطلب",
    "جاري التجهيز",
    "خرج للتوصيل",
    "في الطريق الآن",
    "تم التسليم",
  ];

  const getIcon = (i) => {
    if (i < stage) return "✔";
    if (i === stage) return "⏳";
    return "●";
  };

  return (
    <div
      className="
        min-h-screen text-white p-6 pt-28 relative
        bg-[url('/assets/kababNar.png')] 
        bg-cover bg-center bg-fixed
      "
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

      <div className="relative z-10">

        <h1 className="text-center text-5xl font-extrabold mb-10 text-red-500 drop-shadow-xl">
          تتبع طلبك 📍
        </h1>

        <div className="max-w-xl mx-auto bg-[#121212]/90 border border-red-900/40 rounded-xl p-6 shadow-2xl">

          {/* INPUT */}
          <input
            className="
              w-full p-4 bg-black rounded-xl
              text-white border border-red-900/40
              focus:border-red-600 outline-none transition
              mb-4
            "
            placeholder="أدخل رقم الطلب"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />

          {/* BUTTON */}
          <button
            onClick={search}
            className="
              w-full py-3 bg-red-600 hover:bg-red-700 
              text-white font-extrabold rounded-xl
              hover:scale-105 active:scale-95 transition
            "
          >
            تتبع الطلب
          </button>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-center mt-4 font-bold">{error}</p>
          )}

          {/* PROGRESS */}
          {order && (
            <div className="mt-6">
              {steps.map((text, i) => (
                <div key={i} className="flex items-center gap-4 mb-6">

                  <span className="text-3xl text-red-500">{getIcon(i)}</span>

                  <span
                    className={`text-lg ${
                      i === stage ? "text-red-500 font-bold" : "text-gray-300"
                    }`}
                  >
                    {text}
                  </span>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
