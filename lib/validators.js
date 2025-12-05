export const validateName = (value) =>
  value.trim().split(" ").length >= 2 &&
  /^[A-Za-z\u0600-\u06FF\s]+$/.test(value);

export const validateSaudiPhone = (value) =>
  /^05[0-9]{8}$/.test(value);
