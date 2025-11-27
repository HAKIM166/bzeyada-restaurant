"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/solid";

import { addons } from "@/lib/addonsData";   // ⭐ مهم جداً

// دالة تجيب اسم الإضافة المجانية باستخدام ID
const getFreeAddonName = (idOrObj) => {
  // لو الإضافة object فعلاً (name موجود) نرجعها مباشرة
  if (typeof idOrObj === "object" && idOrObj?.name) {
    return idOrObj.name;
  }

  // لو الإضافة رقم (ID)
  const id = Number(idOrObj);

  const freeGroup = addons.find((group) => group.type === "free");
  if (!freeGroup) return id;

  const match = freeGroup.items.find((i) => i.id === id);
  return match ? match.name : id;
};

export default function ReviewPage() {
  const { cart, total } = useCart();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (cart.length === 0) router.push("/cart");

    const u = localStorage.getItem("bz-user");
    const p = localStorage.getItem("bz-payment");

    if (!u) router.push("/checkout/details");
    if (!p) router.push("/checkout/payment");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(JSON.parse(u || "{}"));
    setPayment(p || "");
  }, []);

  if (!user) return null;

  const googleMapsUrl =
    user.coords
      ? `https://www.google.com/maps?q=${user.coords.lat},${user.coords.lng}`
      : null;

  const calcPaidAddons = (item) =>
    item.paidAddons?.reduce((sum, a) => sum + a.qty * a.price, 0) || 0;

  const calcItemSubtotal = (item) => {
    const base = Number(item.finalPrice ?? item.price ?? 0);
    const addonsTotal = calcPaidAddons(item);
    return (base + addonsTotal) * item.qty;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen text-white px-6 py-20 bg-[url('/assets/dark-wood.jpg')] bg-cover bg-fixed"
    >
      <h1 className="text-center text-5xl font-extrabold mb-14 text-red-600">
        مراجعة الطلب
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* بيانات العميل */}
        <div className="bg-[#121212] p-6 rounded-xl border border-red-900/40 shadow">
          <h3 className="text-3xl font-bold text-red-500 mb-4">بيانات العميل</h3>

          <p className="text-lg mb-2">
            <span className="text-red-400">الاسم:</span> {user.name}
          </p>

          <p className="text-lg mb-2">
            <span className="text-red-400">الجوال:</span> {user.phone}
          </p>

          <p className="text-lg mb-2">
            <span className="text-red-400">طريقة الاستلام:</span>{" "}
            {user.deliveryMethod === "delivery" ? "توصيل" : "استلام من الفرع"}
          </p>

          <p className="text-lg mb-2">
            <span className="text-red-400">العنوان:</span> {user.address}
          </p>

          {user.deliveryMethod === "delivery" && user.coords && (
            <div className="mt-4 bg-black/40 p-4 rounded-xl border border-red-900/40">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2 text-red-400">
                <MapPinIcon className="w-6 h-6 text-red-500" />
                موقع العميل
              </h4>

              <p className="text-sm text-gray-300">خط العرض: {user.coords.lat}</p>
              <p className="text-sm text-gray-300 mb-2">خط الطول: {user.coords.lng}</p>

              <a
                href={googleMapsUrl}
                target="_blank"
                className="inline-block mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold"
              >
                فتح الموقع على خرائط Google
              </a>
            </div>
          )}
        </div>

        {/* الطلبات */}
        <div className="bg-[#121212] p-6 rounded-xl border border-red-900/40 shadow">
          <h3 className="text-3xl font-bold text-red-500 mb-4">الطلبات</h3>

          {cart.map((item) => (
            <div key={item.uniqueId} className="border-b border-white/10 pb-4 mb-4">

              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-white">{item.name}</h4>
                <span className="text-red-500 font-bold">{calcItemSubtotal(item)} ريال</span>
              </div>

              <p className="text-gray-300 text-sm mt-1">الكمية: {item.qty}</p>
              <p className="text-gray-300 text-sm">السعر الأساسي: {item.finalPrice || item.price} ريال</p>

              {/* ⭐ إضافات مجانية (تحويل الرقم إلى الاسم الحقيقي) */}
              {item.freeAddons?.length > 0 && (
                <div className="mt-2 text-green-400 text-sm">
                  إضافات مجانية:
                  <ul className="ml-4 mt-1 space-y-1 text-white">
                    {item.freeAddons.map((free, index) => (
                      <li key={index}>• {getFreeAddonName(free)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* إضافات مدفوعة */}
              {item.paidAddons?.length > 0 && (
                <div className="mt-2 text-red-400 text-sm">
                  إضافات مدفوعة:
                  <ul className="ml-4 mt-1 space-y-1 text-white">
                    {item.paidAddons.map((addon) => (
                      <li key={addon.id}>
                        • {addon.name} × {addon.qty} — {addon.qty * addon.price} ريال
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.note && (
                <p className="mt-2 text-yellow-300 text-sm">
                  ملاحظات: {item.note}
                </p>
              )}
            </div>
          ))}

          <p className="text-3xl font-bold mt-4">
            الإجمالي: <span className="text-red-500">{total} ريال</span>
          </p>
        </div>

        {/* الدفع */}
        <div className="bg-[#121212] p-6 rounded-xl border border-red-900/40 shadow">
          <h3 className="text-3xl font-bold text-red-500 mb-4">الدفع</h3>
          <p className="text-lg">
            {payment === "cash" ? "الدفع عند الاستلام" : "دفع إلكتروني"}
          </p>
        </div>

        {/* تأكيد */}
        <button
          onClick={() => router.push("/checkout/success")}
          className="w-full py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-xl mt-6 shadow-lg"
        >
          تأكيد الطلب
        </button>
      </div>
    </motion.div>
  );
}
