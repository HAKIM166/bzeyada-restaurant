/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import AddonsModal from "@/components/AddonsModal";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, calculateItemTotal, total } =
    useCart();

  const [addons, setAddons] = useState({ free: [], paid: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function loadAddons() {
      const res = await fetch("/api/addons");
      const data = await res.json();
      setAddons(data.data || { free: [], paid: [] });
    }
    loadAddons();
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[url('/assets/dark-wood.jpg')] bg-cover bg-center text-white px-4 py-24 relative">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="text-center text-6xl font-extrabold mb-8">السلة</h1>

        {cart.length === 0 && (
          <div className="text-center mt-20 flex flex-col items-center justify-center">
            {/* ICON */}
            <ShoppingCartIcon className="w-20 h-20 text-gray-500 mb-4" />

            {/* TEXT */}
            <p className="text-xl text-gray-300 mb-4">السلة فارغة حالياً</p>

            {/* BUTTON */}
            <a
              href="/menu"
              className="
        px-8 py-3 
        bg-red-600 hover:bg-red-700 
        rounded-full 
        text-white font-bold 
        shadow-lg 
        transition-all active:scale-95
      "
            >
              تصفح المنيو
            </a>
          </div>
        )}

        {/* CART LIST */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.uniqueId}
              className="flex gap-3 bg-[#121212] p-4 rounded-2xl border border-red-900/30 shadow-xl"
            >
              {/* IMAGE */}
              {item.img ? (
                <img
                  src={item.img}
                  className="w-20 h-20 rounded-xl object-cover border border-red-900/40"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gray-700 flex items-center justify-center text-sm text-gray-300">
                  بدون صورة
                </div>
              )}

              <div className="flex-1">
                {/* NAME */}
                <h3 className="text-[25px] font-extrabold text-[#ff3b3b] leading-tight">
                  {item.name || "منتج بدون اسم"}
                </h3>

                {/* BASE PRICE */}
                <p className="text-gray-300 text-[12px] mt-1">
                  السعر الأساسي:
                  <span className="text-white font-semibold">
                    {" "}
                    {item.price || 0} ريال
                  </span>
                </p>

                {/* FREE ADDONS — FIXED HTML */}
                {item.freeAddons?.length > 0 && (
                  <div className="text-green-400 text-xs mt-1">
                    🟢 إضافات مجانية:
                    <ul className="ml-4 list-disc text-white">
                      {item.freeAddons.map((id) => {
                        const match = addons.free.find((x) => x.id === id);
                        return (
                          <li key={id}>{match?.name || "إضافة غير معروفة"}</li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* PAID ADDONS — FIXED HTML + SAFE PRICE */}
                {item.paidAddons?.length > 0 && (
                  <div className="text-red-400 text-xs mt-1">
                    💰 إضافات مدفوعة:
                    <ul className="ml-4 list-disc text-white">
                      {item.paidAddons.map((ad) => {
                        const match = addons.paid.find((p) => p.id === ad.id);

                        const addonName = match?.name || "إضافة غير معروفة";
                        const addonPrice = match?.price || 0;
                        const totalAddon = addonPrice * ad.qty;

                        return (
                          <li key={ad.id}>
                            {addonName} × {ad.qty} = {totalAddon} ريال
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* NOTE */}
                {item.note && (
                  <p className="mt-1 text-xs text-yellow-300">
                    📝 ملاحظات:
                    <span className="text-white"> {item.note}</span>
                  </p>
                )}

                {/* SUBTOTAL */}
                <p className="mt-1 text-[14px] font-bold text-yellow-400">
                  الإجمالي الفرعي:{" "}
                  <span className="text-white">
                    {calculateItemTotal(item)} ريال
                  </span>
                </p>

                {/* EDIT BUTTON */}
                <button
                  onClick={() => openModal(item)}
                  className="text-blue-300 hover:text-blue-200 text-sm flex items-center gap-1 mt-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                  تعديل الإضافات
                </button>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      item.qty === 1
                        ? removeFromCart(item.uniqueId)
                        : updateQty(item.uniqueId, item.qty - 1)
                    }
                    className="w-7 h-7 bg-[#1b1b1b] rounded-full text-sm"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">{item.qty}</span>

                  <button
                    onClick={() => updateQty(item.uniqueId, item.qty + 1)}
                    className="w-7 h-7 bg-red-600 rounded-full text-sm text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.uniqueId)}
                  className="px-3 py-1 bg-red-700 text-white text-xs rounded-lg"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        {cart.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-[#121212] border border-red-900/30 text-center">
            <p className="text-2xl font-extrabold text-red-500">
              الإجمالي: <span className="text-white">{total} ريال</span>
            </p>

            <a
              href="/checkout/details"
              className="mt-4 block py-3 rounded-full text-lg bg-red-600 text-white hover:bg-red-700"
            >
              متابعة تنفيذ الطلب
            </a>
          </div>
        )}

        {showModal && (
          <AddonsModal item={selectedItem} close={closeModal} addons={addons} />
        )}
      </div>
    </div>
  );
}
