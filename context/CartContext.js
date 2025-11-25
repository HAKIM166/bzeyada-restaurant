/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // -----------------------------
  // LOAD CART FROM LOCAL STORAGE
  // -----------------------------
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bz-cart");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCart(parsed);
        } else {
          setCart([]);
        }
      }
    } catch (err) {
      console.error("Error loading cart:", err);
      setCart([]);
    }
  }, []);

  // -----------------------------
  // SAVE CART TO LOCAL STORAGE
  // -----------------------------
  useEffect(() => {
    try {
      localStorage.setItem("bz-cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  }, [cart]);

  // -----------------------------
  // ADD ITEM
  // -----------------------------
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // -----------------------------
  // REMOVE ITEM
  // -----------------------------
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // -----------------------------
  // UPDATE QTY
  // -----------------------------
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(qty, 1) } : item
      )
    );
  };

  // -----------------------------
  // CLEAR CART AFTER SUCCESS
  // -----------------------------
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("bz-cart");
  };

  // -----------------------------
  // TOTAL PRICE
  // -----------------------------
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
