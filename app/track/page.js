/* eslint-disable react-hooks/purity */
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
    if (i < stage)
      return "✔";
    if (i === stage)
      return "⏳";
    return "●";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-center text-4xl font-extrabold mb-8 bg-gradient-to-r
      from-[#d4a755] to-[#fce4b7] bg-clip-text text-transparent">
        تتبع طلبك 📍
      </h1>

      <div className="max-w-xl mx-auto bg-[#191715] border border-[#2d2c2b] rounded-xl p-6">
        <input
          className="w-full p-4 bg-black text-white border border-[#2d2c2b]
          rounded-xl focus:outline-none mb-4"
          placeholder="أدخل رقم الطلب"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />

        <button
          onClick={search}
          className="w-full py-3 bg-gradient-to-r from-[#d4a755] to-[#fce4b7]
          text-black font-extrabold rounded-xl hover:scale-105 transition"
        >
          تتبع الطلب
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4 font-bold">{error}</p>
        )}

        {order && (
          <div className="mt-6">
            {steps.map((text, i) => (
              <div key={i} className="flex items-center gap-4 mb-6">
                <span className="text-2xl">{getIcon(i)}</span>
                <span
                  className={`text-lg ${
                    i === stage ? "text-[#d4a755]" : "text-gray-300"
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
  );
}
