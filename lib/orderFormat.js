export const formatOrder = (user, cart, total, payment = "cash") => {
  return {
    user: {
      name: user.name,
      phone: user.phone,
      deliveryMethod: user.deliveryMethod,
      address: user.address || "",
      coords: user.coords || null,
    },
    cart: cart.map((item) => ({
      id: item.id,
      name: item.name,
      img: item.img,
      price: item.price,
      qty: item.qty,
      size: item.size,
      freeAddons: item.freeAddons || [],
      paidAddons: item.paidAddons || [],
      note: item.note || "",
      finalPrice: item.finalPrice || item.price,
    })),
    total,
    payment,
  };
};
