/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ----------------------------------------
  // LOAD CART FROM LOCAL STORAGE
  // ----------------------------------------
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bz-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {}
  }, []);

  // ----------------------------------------
  // SAVE CART TO LOCAL STORAGE
  // ----------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem("bz-cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // ----------------------------------------
  // GET CATEGORY LIMIT
  // ----------------------------------------
  const getMaxQty = (item) => {
    const name = item?.name || "";

    if (name.includes("بيبسي") || name.includes("مشروبات") || name === "ماء")
      return 10;

    if (name.includes("صحن") || name.includes("مشكل") || name.includes("مشويات"))
      return 6;

    return 5; // default
  };

  // -----------------------------------------------------------
  // GENERATE UNIQUE ID (important when addons change)
  // -----------------------------------------------------------
  const generateUniqueId = (item) => {
    return `${item.id}-${item.size || "reg"}-${JSON.stringify(
      item.freeAddons || []
    )}-${JSON.stringify(item.paidAddons || [])}-${item.note || ""}`;
  };

  // -----------------------------------------------------------
  // ADD ITEM TO CART
  // -----------------------------------------------------------
  const addToCart = (item) => {
    const finalItem = {
      ...item,
      freeAddons: item.freeAddons || [],
      paidAddons: item.paidAddons || [],
      note: item.note || "",
      qty: 1,
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

  // -----------------------------------------------------------
  // REMOVE ITEM
  // -----------------------------------------------------------
  const removeFromCart = (uniqueId) => {
    setCart((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // -----------------------------------------------------------
  // UPDATE QUANTITY
  // -----------------------------------------------------------
  const updateQty = (uniqueId, qty) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.uniqueId !== uniqueId) return item;
        const limit = getMaxQty(item);
        return { ...item, qty: Math.max(1, Math.min(qty, limit)) };
      })
    );
  };

  // -----------------------------------------------------------
  // UPDATE ADDONS (from modal)
  // -----------------------------------------------------------
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

        // Re-generate unique ID after addons change
        updated.uniqueId = generateUniqueId(updated);

        return updated;
      })
    );
  };

  // -----------------------------------------------------------
  // CALCULATE TOTAL PRICE FOR ONE ITEM
  // -----------------------------------------------------------
  const calculateItemTotal = (item) => {
    const basePrice = Number(item.finalPrice ?? item.price ?? 0);

    const paidAddonsTotal =
      item.paidAddons?.reduce((sum, addon) => {
        return sum + addon.price * addon.qty;
      }, 0) || 0;

    return (basePrice + paidAddonsTotal) * item.qty;
  };

  // -----------------------------------------------------------
  // CART TOTAL
  // -----------------------------------------------------------
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
