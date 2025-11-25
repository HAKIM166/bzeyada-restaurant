"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-center text-4xl font-bold mb-10 text-[#fce4b7]">
        مراجعة الطلب
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">

        {/* بيانات العميل */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-[#fce4b7] mb-3">بيانات العميل</h3>
          <p>الاسم: {user.name}</p>
          <p>الجوال: {user.phone}</p>
          <p>العنوان: {user.address}</p>
        </div>

        {/* السلة */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl space-y-3">
          <h3 className="text-2xl font-bold text-[#fce4b7] mb-3">الطلبات</h3>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#333] pb-2">
              <span>{item.name} × {item.qty}</span>
              <span className="text-[#d4a755]">{item.price * item.qty} ريال</span>
            </div>
          ))}

          <p className="text-xl font-bold mt-4">
            الإجمالي: <span className="text-[#d4a755]">{total} ريال</span>
          </p>
        </div>

        {/* الدفع */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-[#fce4b7] mb-3">الدفع</h3>
          <p>{payment === "cash" ? "الدفع عند الاستلام" : "دفع إلكتروني"}</p>
        </div>

        {/* زر الإرسال */}
        <button
          onClick={() => router.push("/checkout/success")}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4a755] to-[#fce4b7] text-black font-bold text-lg mt-6"
        >
          تأكيد الطلب
        </button>

      </div>
    </div>
  );
}
