export const createOrderObject = (user, cart, total) => {
  return {
    user: {
      name: user.name,
      phone: user.phone,
      deliveryMethod: user.deliveryMethod,
      address: user.address,
      coords: user.coords || null
    },
    cart: cart,
    total: total
  };
};
