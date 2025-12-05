"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ item, big, qty = 1 }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const cartItem = {
      id: item.id,

      // ⭐⭐⭐ الحل هنا ⭐⭐⭐
      name:
        item.name ||         // المنتجات العادية
        item.title ||        // المنتجات القادمة من offers
        item.productName ||  // احتياطي لو backend مختلف
        "منتج بدون اسم",     // fallback لو في منتج ناقص بيانات

      img: item.img || item.image || null,
      price: item.price || item.finalPrice || 0,
      qty: qty,
      size: item.size || "reg",
      options: item.options || {},
    };

    addToCart(cartItem);
  };

  return (
    <button
      onClick={handleAdd}
      className={`
        ${big ? "px-10 py-4 text-xl" : "px-4 py-2 text-sm"}
        bg-red-600 hover:bg-red-700 
        text-white font-bold rounded-xl
        active:scale-95 transition
        shadow-lg
      `}
    >
      أضف للسلة
    </button>
  );
}
