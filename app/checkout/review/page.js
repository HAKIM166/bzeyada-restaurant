"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function ReviewPage() {
  const { cart, total } = useCart();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState("");
  const [addons, setAddons] = useState(null);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      router.replace("/cart");
      return;
    }

    const u = JSON.parse(localStorage.getItem("bz-user") || "{}");
    if (!u?._id) {
      router.replace("/auth/login");
      return;
    }

    const d = JSON.parse(localStorage.getItem("bz-delivery") || "{}");
    if (!d?.deliveryMethod) {
      router.replace("/checkout/details");
      return;
    }

    const p = localStorage.getItem("bz-payment") || "";
    if (!p) {
      router.replace("/checkout/payment");
      return;
    }

    fetch("/api/addons")
      .then((r) => r.json())
      .then((res) => res.success && setAddons(res.data))
      .catch(() => setAddons(null));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(u);
    setDelivery(d);
    setPayment(p);
  }, [cart, router]);

  if (!user || !delivery) return null;

  const isPickup = delivery.deliveryMethod === "pickup";

  const getAddonName = (id) => {
    if (!addons) return id;

    const f = addons.free?.find((a) => a.id == id);
    if (f) return f.name;

    const p = addons.paid?.find((a) => a.id == id);
    if (p) return p.name;

    return id;
  };

  const calcPaidAddons = (item) =>
    item.paidAddons?.reduce(
      (sum, addon) => sum + addon.price * addon.qty,
      0
    ) || 0;

  const calcItemSubtotal = (item) => {
    const base = Number(item.basePrice ?? 0);
    const addons = calcPaidAddons(item);
    return (base + addons) * item.qty;
  };

  const saveMockOrder = (mockId) => {
    const finalOrder = {
      _id: mockId,
      createdAt: Date.now(),
      status: "pending",
      user: {
        name: user.name,
        phone: user.phone,
        deliveryMethod: delivery.deliveryMethod,
        address: delivery.address,
        coords: delivery.coords,
      },
      cart,
      total,
      payment,
    };

    let existing = JSON.parse(localStorage.getItem("mock-orders") || "[]");
    existing.push(finalOrder);

    localStorage.setItem("mock-orders", JSON.stringify(existing));
  };

  const confirmOrder = async () => {
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          cart,
          total,
          payment,
          deliveryMethod: delivery.deliveryMethod,
          address: delivery.address,
          coords: delivery.coords,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok || !data?.success) {
        const mockId = Math.floor(10000 + Math.random() * 90000);
        saveMockOrder(mockId);
        router.push(`/checkout/success?orderId=${mockId}`);
        return;
      }

      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch {
      const mockId = Math.floor(10000 + Math.random() * 90000);
      saveMockOrder(mockId);
      router.push(`/checkout/success?orderId=${mockId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-24 relative
        bg-[url('/assets/dark-wood.jpg')] bg-cover bg-center bg-fixed
      "
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-3xl mx-auto">

        <h1 className="text-center text-5xl font-extrabold mb-12 text-red-600 drop-shadow-lg">
          مراجعة الطلب
        </h1>

        <div className="space-y-6">

          {/* بيانات العميل */}
          <div className="bg-[#141414]/90 p-6 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">بيانات العميل</h2>

            <p><span className="text-red-400">الاسم:</span> {user.name}</p>
            <p><span className="text-red-400">الجوال:</span> {user.phone}</p>
            <p>
              <span className="text-red-400">طريقة الاستلام:</span>
              {isPickup ? " استلام من الفرع" : " توصيل للموقع"}
            </p>

            {!isPickup && (
              <p><span className="text-red-400">العنوان:</span> {delivery.address}</p>
            )}
          </div>

          {/* تفاصيل الطلب */}
          <div className="bg-[#141414]/90 p-6 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">تفاصيل الطلب</h2>

            {cart.map((item) => {
              const addonTotal = calcPaidAddons(item);
              const subtotal = calcItemSubtotal(item);

              return (
                <div key={item.uniqueId} className="border-b border-white/10 pb-4 mb-4">

                  {/* اسم المنتج + السعر الأساسي */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">{item.name}</h3>

                    {/* السعر الأساسي يجب أن يظهر هنا بالأحمر كما كان */}
                    <span className="text-red-500 font-bold text-lg">
                      {item.basePrice} ريال
                    </span>
                  </div>

                  {/* الكمية */}
                  <p className="text-gray-400 text-sm">الكمية: {item.qty}</p>

                  {/* إضافات مجانية */}
                  {item.freeAddons?.length > 0 && (
                    <div className="text-green-400 text-sm mt-2">
                      إضافات مجانية:
                      <ul className="ml-4 text-white">
                        {item.freeAddons.map((freeId, i) => (
                          <li key={i}>• {getAddonName(freeId)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* إضافات مدفوعة */}
                  {item.paidAddons?.length > 0 && (
                    <div className="text-red-400 text-sm mt-2">
                      إضافات مدفوعة:
                      <ul className="ml-4 text-white">
                        {item.paidAddons.map((add, i) => (
                          <li key={i}>
                            • {getAddonName(add.id)} × {add.qty} — {add.qty * add.price} ريال
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* إجمالي المنتج */}
                  <p className="text-red-500 font-bold mt-3 text-lg">
                    إجمالي المنتج: {subtotal} ريال
                  </p>

                </div>
              );
            })}

            <p className="text-3xl font-bold mt-4">
              الإجمالي الكلي: <span className="text-red-500">{total} ريال</span>
            </p>
          </div>

          <div className="bg-[#141414]/90 p-6 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">طريقة الدفع</h2>
            <p className="text-lg">
              {payment === "cash" ? "💵 الدفع عند الاستلام" : "💳 دفع إلكتروني"}
            </p>
          </div>

          <button
            onClick={confirmOrder}
            className="
              w-full py-4 rounded-full bg-red-600 
              font-extrabold text-xl hover:bg-red-700 
              active:scale-95 transition
            "
          >
            تأكيد الطلب
          </button>

        </div>
      </div>
    </motion.div>
  );
}
