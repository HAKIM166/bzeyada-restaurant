"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { addons } from "@/lib/addonsData";

export default function AddToCartButton({ item }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = () => {
    // -------------------------------
    // 1️⃣ تحويل الإضافات IDs → objects
    // -------------------------------
    const fullAddons = (item.addons || []).map((id) => {
      const group = addons.find((g) =>
        g.items.some((a) => a.id === id)
      );
      return group ? group.items.find((a) => a.id === id) : null;
    }).filter(Boolean);

    // -------------------------------
    // 2️⃣ حساب السعر النهائي بدقة
    // -------------------------------
    const addonsTotal = fullAddons.reduce((sum, a) => sum + a.price, 0);

    const finalPrice =
      Number(item.price || 0) +
      Number(item.sizePrice || 0) +
      Number(addonsTotal);

    // -------------------------------
    // 3️⃣ uniqueId لكل اختيار مختلف
    // -------------------------------
    const uniqueId = `${item.id}-${item.size}-${fullAddons
      .map((a) => a.id)
      .join(",")}-${item.note || ""}`;

    // -------------------------------
    // 4️⃣ تجهيز المنتج للكارت
    // -------------------------------
    const productToAdd = {
      uniqueId,
      id: item.id,
      name: item.name,
      img: item.img,
      basePrice: item.price,
      size: item.size || "regular",
      sizePrice: item.sizePrice || 0,
      addons: fullAddons,
      note: item.note || "",
      finalPrice,
      qty: 1,
      maxQty: item.maxQty || 10, // لو عايز تستخدم maxQty من الداتا
    };

    addToCart(productToAdd);
    showToast(`${item.name} تمت إضافته للسلة`);
  };

  return (
    <button
      onClick={handleAdd}
      className="
        cursor-pointer sm:w-2xl max-sm:w-xl max-w-[85px] py-2 max-sm:py-1 
        bg-red-600 text-white font-bold rounded-sm
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
