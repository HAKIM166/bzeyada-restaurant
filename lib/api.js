export const API = {
  // --------- MENU ----------
  getProducts: async () => {
    const res = await fetch("/api/products");
    return res.json();
  },

  getProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`);
    return res.json();
  },

  // --------- ADDONS ----------
  getAddons: async () => {
    const res = await fetch("/api/addons");
    return res.json();
  },

  // --------- OFFERS ----------
  getOffers: async () => {
    const res = await fetch("/api/offers");
    return res.json();
  },

  // --------- CART SYNC ----------
  syncCart: async (cart) => {
    const res = await fetch("/api/cart/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    return res.json();
  },

  // --------- ORDERS ----------
  createOrder: async (order) => {
    const res = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    return res.json();
  },

  getOrderStatus: async (id) => {
    const res = await fetch(`/api/orders/${id}/status`);
    return res.json();
  }
};
