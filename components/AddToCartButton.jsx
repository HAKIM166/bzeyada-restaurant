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
    cursor-pointer sm:w-2xl max-sm:w-xl max-w-[85px] py-2 max-sm:py-1 bg-red-600 text-white font-bold rounded-sm
    text-sm max-sm:text-[11px]

    shadow-md shadow-black/40

    hover:bg-red-700
    active:scale-95

    transition-all duration-200
  "
>
  أضف للسلة
</button>

  );
}
