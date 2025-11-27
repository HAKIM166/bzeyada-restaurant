"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import {
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

import { getDistanceFromLatLon } from "@/lib/distance";

// 👇 تحميل كومبونانت الخريطة فقط (بدون SSR)
const MapSelector = dynamic(() => import("@/components/MapSelector"), {
  ssr: false,
  loading: () => (
    <div className="text-center p-6 text-gray-300">جاري تحميل الخريطة…</div>
  ),
});

// ------------------------------
// 🔥 إعدادات المطعم
// ------------------------------
const RESTAURANT_LOCATION = { lat: 25.4439767, lng: 49.5975184 };
const MAX_DISTANCE_KM = 6;

export default function DetailsPage() {
  const router = useRouter();

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [coords, setCoords] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);

  const [loadingLoc, setLoadingLoc] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // ------------------------------
  // ✔ التحقق من صحة الاسم
  // ------------------------------
const validateName = (value) =>
  value.trim().split(" ").length >= 2 &&
  /^[A-Za-z\u0600-\u06FF\s]+$/.test(value);


  // ------------------------------
  // ✔ التحقق من رقم سعودي
  // ------------------------------
  const validatePhone = (value) => /^05[0-9]{8}$/.test(value);

  // ------------------------------
  // 📍 تحديد الموقع تلقائياً
  // ------------------------------
  const detectLocation = () => {
    setLoadingLoc(true);

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      alert("متصفحك لا يدعم تحديد الموقع");
      setLoadingLoc(false);
      return;
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

  // ------------------------------
  // ▶ متابعة الدفع
  // ------------------------------
  const handleNext = () => {
    if (!validateName(name)) {
      alert("❌ فضلاً أدخل اسم صحيح (مثال: محمد أحمد)");
      return;
    }

    if (!validatePhone(phone)) {
      alert("❌ رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام");
      return;
    }

    if (!address.trim()) {
      alert("❌ الرجاء كتابة العنوان بالتفصيل");
      return;
    }

    if (deliveryMethod === "delivery") {
      if (!coords) {
        alert("❌ الرجاء تحديد موقعك");
        return;
      }

      if (distanceKm > MAX_DISTANCE_KM) {
        alert("🚫 موقعك خارج نطاق التوصيل — اختر الاستلام من الفرع");
        return;
      }
    }

    const userData = {
      name,
      phone,
      address,
      coords,
      distanceKm,
      deliveryMethod,
    };

    localStorage.setItem("bz-user", JSON.stringify(userData));

    router.push("/checkout/payment");
  };

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
        
        {/* نوع التوصيل */}
        <div className="flex justify-center gap-6 mb-4">
          <button
            onClick={() => setDeliveryMethod("delivery")}
            className={`px-6 py-3 rounded-xl font-bold ${
              deliveryMethod === "delivery"
                ? "bg-red-600 text-white"
                : "bg-[#222]"
            }`}
          >
            توصيل
          </button>

          <button
            onClick={() => setDeliveryMethod("pickup")}
            className={`px-6 py-3 rounded-xl font-bold ${
              deliveryMethod === "pickup"
                ? "bg-red-600 text-white"
                : "bg-[#222]"
            }`}
          >
            استلام من الفرع
          </button>
        </div>

        {/* الاسم */}
        <input
          type="text"
          placeholder="الاسم الكامل"
          className="w-full p-4 bg-[#121212] rounded-xl border border-red-900/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* الهاتف */}
        <input
          type="number"
          placeholder="رقم الجوال (سعودي)"
          className="w-full p-4 bg-[#121212] rounded-xl border border-red-900/40"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* العنوان */}
        <textarea
          placeholder="العنوان بالتفصيل"
          className="w-full p-4 h-32 bg-[#121212] rounded-xl border border-red-900/40"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* التوصيل فقط */}
        {deliveryMethod === "delivery" && (
          <>
            <button
              onClick={detectLocation}
              disabled={loadingLoc}
              className="
                w-full py-4 rounded-xl 
                bg-linear-to-r from-[#d4a755] to-[#b88b32]
                text-black font-bold flex justify-center gap-3 shadow-lg
                hover:opacity-90 active:scale-95
              "
            >
              <MapPinIcon className="w-6 h-6" />
              {loadingLoc ? "جاري تحديد موقعك…" : "تحديد الموقع تلقائياً"}
            </button>

            {/* حالة الموقع */}
            {coords && (
              <div className="text-center mt-3">
                {distanceKm <= MAX_DISTANCE_KM ? (
                  <p className="text-green-400 flex justify-center items-center gap-2 font-bold">
                    <CheckCircleIcon className="w-6 h-6" />
                    موقعك داخل نطاق التوصيل ({distanceKm.toFixed(2)} كم)
                  </p>
                ) : (
                  <p className="text-red-400 flex justify-center items-center gap-2 font-bold">
                    <XCircleIcon className="w-6 h-6" />
                    موقعك خارج نطاق التوصيل ({distanceKm.toFixed(2)} كم)
                  </p>
                )}
              </div>
            )}

            <p className="text-center text-gray-300 mt-4">
              أو اختر موقعك من الخريطة:
            </p>

            {/* 👇 هنا يتم عرض الخريطة */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">
              <MapSelector
                coords={coords}
                setCoords={setCoords}
                calcDistance={(c) => {
                  const dist = getDistanceFromLatLon(
                    RESTAURANT_LOCATION.lat,
                    RESTAURANT_LOCATION.lng,
                    c.lat,
                    c.lng
                  );
                  setDistanceKm(dist);
                }}
                center={[
                  RESTAURANT_LOCATION.lat,
                  RESTAURANT_LOCATION.lng,
                ]}
              />
            </div>
          </>
        )}

        {/* زر متابعة */}
        <button
          onClick={handleNext}
          className="
            w-full py-4 rounded-full bg-red-600 
            font-extrabold text-xl hover:bg-red-700
            active:scale-95
          "
        >
          متابعة الدفع
        </button>
      </div>
    </motion.div>
  );
}
