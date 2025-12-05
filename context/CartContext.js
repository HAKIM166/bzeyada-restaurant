"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /* ---------------------- Load Cart ---------------------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bz-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {}
  }, []);

  /* ---------------------- Save Cart ---------------------- */
  useEffect(() => {
    try {
      localStorage.setItem("bz-cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  /* ---------------------- Max Qty Rules ---------------------- */
  const getMaxQty = (item) => {
    const name = item?.name || "";

    if (name.includes("بيبسي") || name.includes("مشروبات") || name === "ماء")
      return 10;

    if (
      name.includes("صحن") ||
      name.includes("مشكل") ||
      name.includes("مشويات")
    )
      return 6;

    return 5;
  };

  /* ---------------------- Unique ID Generator ---------------------- */
  const generateUniqueId = (item) => {
    return `${item.id}-${item.size || "reg"}-${JSON.stringify(
      item.freeAddons || []
    )}-${JSON.stringify(item.paidAddons || [])}-${item.note || ""}`;
  };

  /* ---------------------- Add Item ---------------------- */
  const addToCart = (item) => {
    const finalItem = {
      ...item,
      basePrice: item.basePrice ?? item.price ?? 0, // 👈 السعر الأساسي الصحيح
      freeAddons: item.freeAddons || [],
      paidAddons: item.paidAddons || [],
      note: item.note || "",
      qty: item.qty || 1,
    };

    finalItem.uniqueId = generateUniqueId(finalItem);

    setCart((prev) => {
      const exist = prev.find((p) => p.uniqueId === finalItem.uniqueId);

      if (exist) {
        const limit = getMaxQty(exist);
        if (exist.qty >= limit) return prev;

        return prev.map((p) =>
          p.uniqueId === finalItem.uniqueId ? { ...p, qty: p.qty + 1 } : p
        );
      }

      return [...prev, finalItem];
    });
  };

  /* ---------------------- Remove Item ---------------------- */
  const removeFromCart = (uniqueId) => {
    setCart((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  /* ---------------------- Update Quantity ---------------------- */
  const updateQty = (uniqueId, newQty) => {
    setCart((prev) =>
      newQty <= 0
        ? prev.filter((item) => item.uniqueId !== uniqueId)
        : prev.map((item) =>
            item.uniqueId === uniqueId ? { ...item, qty: newQty } : item
          )
    );
  };

  /* ---------------------- Update Addons ---------------------- */
  const updateItemAddons = (uniqueId, { freeAddons, paidAddons, note }) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.uniqueId !== uniqueId) return item;

        const updated = {
          ...item,
          freeAddons: freeAddons || [],
          paidAddons: paidAddons || [],
          note: note || "",
        };

        updated.uniqueId = generateUniqueId(updated);

        return updated;
      })
    );
  };

  /* ---------------------- Price Calculation ---------------------- */
  const calculateItemTotal = (item) => {
    const base = Number(item.basePrice ?? 0); // 👈 السعر الأساسي الحقيقي

    const paidAddonsTotal =
      item.paidAddons?.reduce((sum, addon) => sum + addon.price * addon.qty, 0) ||
      0;

    return (base + paidAddonsTotal) * item.qty;
  };

  const total = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        updateItemAddons,
        clearCart: () => setCart([]),
        total,
        calculateItemTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
