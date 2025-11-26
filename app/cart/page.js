"use client";

import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/dark-wood.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <h1 className="text-5xl font-extrabold text-center mb-14 text-red-600">
        الســلــة
      </h1>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-xl text-gray-400">السلة فارغة حالياً</p>

          <a
            href="/menu"
            className="
              inline-block mt-6 px-10 py-3 rounded-full
              bg-red-600 hover:bg-red-700 text-white text-lg font-bold
              hover:scale-105 active:scale-95 transition-all
            "
          >
            تصفح المنيو
          </a>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#121212] border border-red-900/30
                p-5 rounded-2xl shadow-lg 
                flex items-center justify-between
                hover:border-red-600 transition-all
              "
            >
              <div>
                <h3 className="text-2xl font-bold text-red-500">{item.name}</h3>
                <p className="text-gray-300 font-semibold mt-1">
                  {item.price} ريال
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* - Button */}
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  disabled={item.qty === 1}
                  className="
                    w-10 h-10 flex items-center justify-center rounded-full
                    bg-[#1b1b1b] text-white text-xl font-bold
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-[#272727] transition
                  "
                >
                  -
                </button>

                {/* Qty */}
                <span className="text-xl font-bold text-white w-8 text-center">
                  {item.qty}
                </span>

                {/* + Button */}
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="
                    w-10 h-10 flex items-center justify-center rounded-full
                    bg-red-600 text-white text-xl font-bold
                    hover:bg-red-700 transition
                  "
                >
                  +
                </button>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="
                    ml-2 px-4 py-2 rounded-lg text-sm font-bold
                    bg-red-700 text-white hover:bg-red-800
                    transition
                  "
                >
                  حذف
                </button>
              </div>
            </div>
          ))}

          {/* Total + Checkout */}
          <div
            className="
              mt-10 p-6 rounded-2xl bg-[#121212] border border-red-900/30
              text-center shadow-lg
            "
          >
            <p className="text-3xl font-extrabold text-red-500">
              الإجمالي:
              <span className="text-white"> {total} ريال </span>
            </p>

            <a
              href="/checkout/details"
              className="
                mt-6 block py-4 rounded-full text-xl font-extrabold
                bg-red-600 hover:bg-red-700
                text-white shadow-lg
                hover:scale-105 active:scale-95 transition-all
              "
            >
              متابعة تنفيذ الطلب
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}
