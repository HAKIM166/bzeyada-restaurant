"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

import { getDistanceFromLatLon } from "@/lib/distance";

// ------------------------------
// 🔥 إعدادات المطعم
// ------------------------------
const RESTAURANT_LOCATION = { lat: 25.4439767, lng: 49.5975184 };
const MAX_DISTANCE_KM = 6;

// ------------------------------
// 🔥 ماركر احترافي بدون صور محلية
// ------------------------------
const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [28, 45],
  iconAnchor: [14, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ------------------------------
// 🔥 Component لاختيار الموقع اليدوي
// ------------------------------
function LocationSelector({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

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
    /^[\u0600-\u06FF\s]+$/.test(value);

  // ------------------------------
  // ✔ التحقق من رقم سعودي
  // ------------------------------
  const validatePhone = (value) => /^05[0-9]{8}$/.test(value);

  // ------------------------------
  // 📍 تحديد الموقع تلقائياً
  // ------------------------------
  const detectLocation = () => {
    setLoadingLoc(true);

    if (!navigator.geolocation) {
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
      alert("❌ فضلاً أدخل اسم صحيح (مثال: محمد علي)");
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

    // DELIVERY ONLY VALIDATION
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

    // 🔥 تخزين البيانات
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

  // ------------------------------
  // ⭐ واجهة الصفحة
  // ------------------------------
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
            {/* زر تحديد تلقائي */}
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

            {/* حالة التوصيل */}
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

            {/* خريطة التحديد */}
            <p className="text-center text-gray-300 mt-4">
              أو اختر موقعك من الخريطة:
            </p>

            <div className="rounded-xl overflow-hidden shadow-lg border border-white/10">

              {/* ✔️ هنا التعديل الوحيد */}
              {typeof window !== "undefined" && (
                <MapContainer
                  center={[RESTAURANT_LOCATION.lat, RESTAURANT_LOCATION.lng]}
                  zoom={14}
                  scrollWheelZoom={true}
                  style={{ height: "350px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  <LocationSelector
                    setCoords={(c) => {
                      setCoords(c);
                      const dist = getDistanceFromLatLon(
                        RESTAURANT_LOCATION.lat,
                        RESTAURANT_LOCATION.lng,
                        c.lat,
                        c.lng
                      );
                      setDistanceKm(dist);
                    }}
                  />

                  {coords && (
                    <Marker
                      position={[coords.lat, coords.lng]}
                      icon={markerIcon}
                    />
                  )}
                </MapContainer>
              )}

            </div>
          </>
        )}

        {/* متابعة */}
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
