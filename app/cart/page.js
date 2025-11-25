"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  return (
    <div className="min-h-screen bg-[#0c0b0a] text-white p-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#fce4b7]">
        الســلــة
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-lg text-gray-400">السلة فارغة حالياً</p>

          <a
            href="/menu"
            className="
              inline-block mt-6 px-10 py-3 rounded-full
              bg-gradient-to-r from-[#d4a755] to-[#fce4b7]
              text-black text-lg font-bold shadow-lg
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
                bg-[#191715] border border-[#2d2c2b]
                p-5 rounded-2xl shadow-lg flex items-center justify-between
                hover:border-[#d4a755] transition-all
              "
            >
              <div>
                <h3 className="text-xl font-bold text-[#fce4b7]">{item.name}</h3>
                <p className="text-[#d4a755] font-semibold">
                  {item.price} ريال
                </p>
              </div>

              <div className="flex items-center gap-2">

                {/* - Button */}
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  disabled={item.qty === 1}
                  className="
                    w-9 h-9 flex items-center justify-center rounded-full
                    bg-[#2d2c2b] text-white text-xl
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-[#3c3b39] transition
                  "
                >
                  -
                </button>

                {/* Qty */}
                <span className="text-xl font-bold text-[#fce4b7] w-8 text-center">
                  {item.qty}
                </span>

                {/* + Button */}
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="
                    w-9 h-9 flex items-center justify-center rounded-full
                    bg-[#d4a755] text-black text-xl font-bold
                    hover:bg-[#e7c987] transition
                  "
                >
                  +
                </button>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="
                    ml-4 px-4 py-2 rounded-full text-sm font-bold
                    bg-red-600 text-white hover:bg-red-700
                    transition-all
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
              mt-8 p-6 rounded-2xl bg-[#191715] border border-[#2d2c2b]
              text-center shadow-lg
            "
          >
            <p className="text-2xl font-bold text-[#fce4b7]">
              الإجمالي:
              <span className="text-[#d4a755]"> {total} ريال </span>
            </p>

            <a
              href="/checkout/details"
              className="
                mt-6 block py-4 rounded-full text-lg font-extrabold
                bg-gradient-to-r from-[#d4a755] to-[#fce4b7]
                text-black shadow-lg
                hover:scale-105 active:scale-95 transition-all
              "
            >
              متابعة تنفيذ الطلب
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
