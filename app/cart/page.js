/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import AddonsModal from "@/components/ModalAddons";
import { addons } from "@/lib/addonsData";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const calcPaidAddons = (item) =>
    item.paidAddons?.reduce((sum, a) => sum + a.qty * a.price, 0) || 0;

  const calcItemSubtotal = (item) => {
    const base = Number(item.finalPrice ?? item.price ?? 0);
    const addonsTotal = calcPaidAddons(item);
    return (base + addonsTotal) * item.qty;
  };

  const total = cart.reduce((sum, item) => sum + calcItemSubtotal(item), 0);

  return (
    <>
      {openModal && (
        <AddonsModal
          item={selectedItem}
          close={() => {
            setOpenModal(false);
            setSelectedItem(null);
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          min-h-screen text-white px-3 py-20
          bg-[url('/assets/dark-wood.jpg')] bg-cover bg-center bg-fixed
        "
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-red-600">
          الســلــة
        </h1>

        {cart.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-lg text-gray-400">السلة فارغة حالياً</p>
            <a
              href="/menu"
              className="inline-block mt-4 px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition"
            >
              تصفح المنيو
            </a>
          </div>
        ) : (
          <div className="max-w-xl mx-auto space-y-4">
            {cart.map((item) => {
              const uniqueKey = item.uniqueId;
              const basePrice = Number(item.finalPrice ?? item.price);
              const paidAddonsTotal = calcPaidAddons(item);

              return (
                <div
                  key={uniqueKey}
                  className="
                    bg-[#121212] p-3 rounded-2xl shadow-lg 
                    border border-red-900/30 hover:border-red-600 transition
                    flex gap-3
                  "
                >
                  <img
                    src={item.img}
                    className="
                      w-16 h-16 rounded-xl object-cover 
                      border border-red-900/40
                    "
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-500 leading-tight">
                      {item.name}
                    </h3>

                    <p className="text-gray-300 text-xs mt-1">
                      السعر الأساسي:
                      <span className="text-white"> {basePrice} ريال</span>
                    </p>

                    {/* FREE ADDONS */}
                    {item.freeAddons?.length > 0 && (
                      <div className="mt-1 text-green-400 text-xs">
                        🟢 إضافات مجانية:
                        <div className="ml-4 space-y-1">
                          {item.freeAddons.map((id) => {
                            const addon = addons
                              .flatMap((g) => g.items)
                              .find((x) => x.id === id);
                            return (
                              <div key={id} className="flex items-center gap-1">
                                •{" "}
                                <span className="text-white">
                                  {addon?.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* PAID ADDONS */}
                    {item.paidAddons?.length > 0 && (
                      <div className="mt-1 text-xs text-red-400">
                        💰 إضافات مدفوعة:
                        <div className="ml-4 space-y-1">
                          {item.paidAddons.map((addon) => (
                            <div
                              key={addon.id}
                              className="flex justify-between"
                            >
                              <span className="text-red-300">
                                • {addon.name} × {addon.qty}
                              </span>
                              <span className="text-white">
                                {addon.qty * addon.price} ريال
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.note && (
                      <p className="mt-1 text-[11px] text-gray-300">
                        📝 ملاحظات:
                        <span className="text-white"> {item.note}</span>
                      </p>
                    )}

                    <p className="mt-1 text-[13px] font-bold text-yellow-400">
                      الإجمالي الفرعي:
                      <span className="text-white">
                        {" "}
                        {calcItemSubtotal(item)} ريال
                      </span>
                    </p>

                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setOpenModal(true);
                      }}
                      className="
    mt-2 flex items-center gap-1
    text-blue-400 font-semibold
    hover:text-blue-300
    transition-all text-[13px]
  "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
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

                  {/* QTY + DELETE */}
                  <div className="flex flex-col justify-between items-center">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQty(uniqueKey, item.qty - 1)}
                        className="w-7 h-7 bg-[#1b1b1b] rounded-full text-sm"
                      >
                        -
                      </button>

                      <span className="text-sm font-bold px-2">{item.qty}</span>

                      <button
                        onClick={() => updateQty(uniqueKey, item.qty + 1)}
                        className="w-7 h-7 bg-red-600 rounded-full text-sm text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(uniqueKey)}
                      className="px-3 py-1 bg-red-700 text-white text-xs rounded-lg"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              );
            })}

            {/* TOTAL */}
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
          </div>
        )}
      </motion.div>
    </>
  );
}
