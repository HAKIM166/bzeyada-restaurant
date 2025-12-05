"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { RESTAURANT_LOCATION, MAX_DISTANCE_KM } from "@/lib/config";

const MapSelector = dynamic(() => import("@/components/MapSelector"), {
  ssr: false,
  loading: () => (
    <div className="text-center p-6 text-gray-300">جاري تحميل الخريطة…</div>
  ),
});

// حساب المسافة
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function DetailsPage() {
  const router = useRouter();

  /* ------------------------------
      STATES
  ------------------------------ */
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [coords, setCoords] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [address, setAddress] = useState("");
  const [loadingLoc, setLoadingLoc] = useState(false);

  /* ------------------------------
      حماية الصفحة
  ------------------------------ */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bz-user") || "{}");

    if (!user?._id) return router.replace("/auth/login");

    // تعبئة البيانات من حساب العميل تلقائياً
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(user.name || "");
    setPhone(user.phone || "");
  }, [router]);

  /* ------------------------------
      تحديد الموقع تلقائياً
  ------------------------------ */
  const detectLocation = () => {
    setLoadingLoc(true);

    if (!navigator?.geolocation) {
      alert("متصفحك لا يدعم تحديد الموقع");
      return setLoadingLoc(false);
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const dist = getDistanceFromLatLon(
          RESTAURANT_LOCATION.lat,
          RESTAURANT_LOCATION.lng,
          lat,
          lng
        );

        setCoords({ lat, lng });
        setDistanceKm(dist);
        setLoadingLoc(false);
      },
      () => {
        alert("تعذر تحديد الموقع — اسمح للمتصفح بالوصول للموقع");
        setLoadingLoc(false);
      }
    );
  };

  /* ------------------------------
      SUBMIT
  ------------------------------ */
  const handleNext = () => {
    // فحص الحقول الأساسية
    if (!name.trim()) return alert("❌ أدخل الاسم");
    if (!phone.trim()) return alert("❌ أدخل رقم الجوال");

    // في حالة التوصيل فقط
    if (deliveryMethod === "delivery") {
      if (!address.trim()) return alert("❌ أدخل العنوان بالكامل");
      if (!coords) return alert("❌ الرجاء تحديد موقعك");

      if (distanceKm > MAX_DISTANCE_KM)
        return alert(`🚫 خارج نطاق التوصيل (${distanceKm.toFixed(2)} كم)`);
    }

    // البيانات اللي هتتسجل في localStorage
    const deliveryData = {
      deliveryMethod,
      name,
      phone,
      address: deliveryMethod === "pickup" ? "" : address,
      coords: deliveryMethod === "pickup" ? null : coords,
      distanceKm: deliveryMethod === "pickup" ? 0 : distanceKm,
    };

    localStorage.setItem("bz-delivery", JSON.stringify(deliveryData));

    router.push("/checkout/payment");
  };

  /* ------------------------------
      UI
  ------------------------------ */
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-20 
        bg-[url('/assets/dark-wood.jpg')] bg-cover bg-center
      "
    >
      <h1 className="text-center text-5xl font-extrabold text-red-600 mb-10">
        بيانات التوصيل
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">

        {/* اختيار طريقة التوصيل */}
        <div className="flex justify-center gap-6 mb-4">
          <button
            onClick={() => setDeliveryMethod("delivery")}
            className={`px-6 py-3 rounded-xl font-bold transition 
              ${
                deliveryMethod === "delivery"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-[#222] hover:bg-[#333]"
              }`}
          >
            توصيل
          </button>

          <button
            onClick={() => setDeliveryMethod("pickup")}
            className={`px-6 py-3 rounded-xl font-bold transition 
              ${
                deliveryMethod === "pickup"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-[#222] hover:bg-[#333]"
              }`}
          >
            استلام من الفرع
          </button>
        </div>

        {/* الاسم */}
        <input
          type="text"
          placeholder="الاسم"
          className="w-full p-4 bg-[#121212] rounded-xl border border-white/20 focus:border-red-600 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* الجوال */}
        <input
          type="tel"
          placeholder="رقم الجوال"
          className="w-full p-4 bg-[#121212] rounded-xl border border-white/20 focus:border-red-600 outline-none transition"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* العنوان إذا كان توصيل */}
        {deliveryMethod === "delivery" && (
          <>
            <textarea
              placeholder="العنوان بالتفصيل"
              className="w-full p-4 h-32 bg-[#121212] rounded-xl border border-red-900/40 focus:border-red-600 transition"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* زر تحديد الموقع */}
            <button
              onClick={detectLocation}
              disabled={loadingLoc}
              className="
                w-full py-4 rounded-xl 
                bg-linear-to-r from-[#d4a755] to-[#b88b32]
                text-black font-bold flex justify-center gap-3 shadow-lg
                hover:opacity-90 active:scale-95 transition
              "
            >
              {loadingLoc ? "جاري التحديد…" : "تحديد الموقع تلقائياً"}
            </button>

            {/* المسافة */}
            {coords && (
              <div className="text-center mt-3">
                {distanceKm <= MAX_DISTANCE_KM ? (
                  <p className="text-green-400 font-bold">
                    داخل نطاق التوصيل ({distanceKm.toFixed(2)} كم)
                  </p>
                ) : (
                  <p className="text-red-400 font-bold">
                    خارج نطاق التوصيل ({distanceKm.toFixed(2)} كم)
                  </p>
                )}
              </div>
            )}

            {/* الخريطة */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 mt-3">
              <MapSelector
                coords={coords}
                setCoords={setCoords}
                calcDistance={(c) => {
                  const d = getDistanceFromLatLon(
                    RESTAURANT_LOCATION.lat,
                    RESTAURANT_LOCATION.lng,
                    c.lat,
                    c.lng
                  );
                  setDistanceKm(d);
                }}
                center={[RESTAURANT_LOCATION.lat, RESTAURANT_LOCATION.lng]}
              />
            </div>
          </>
        )}

        <button
          onClick={handleNext}
          className="
            w-full py-4 rounded-full bg-red-600 
            font-extrabold text-xl hover:bg-red-700
            active:scale-95 shadow-lg transition
          "
        >
          متابعة الدفع
        </button>
      </div>
    </motion.div>
  );
}
