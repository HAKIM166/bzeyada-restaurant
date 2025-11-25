"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";

export default function AddToCartButton({ item }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  return (
    <button
      onClick={() => {
        addToCart(item);
        showToast(`${item.name} تمت إضافته للسلة`);
      }}
      className="
  px-4 py-2 
  bg-gradient-to-r from-[#d4a755] to-[#fce4b7] 
  text-black font-bold
  rounded-lg text-sm
  shadow-md shadow-[#00000040]
  hover:opacity-90 
  active:scale-95 
  transition-all duration-200
"
    >
      أضف للسلة
    </button>
  );
}
