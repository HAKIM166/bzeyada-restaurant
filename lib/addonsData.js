export const addons = [
  {
    group: "إضافات الطعام المجانية",
    type: "free",
    items: [
      { id: 1, name: "بدون بصل" },
      { id: 2, name: "بدون طماطم" },
      { id: 3, name: "زيادة صوص" },
    ],
  },

  {
    group: "إضافات الطعام المدفوعة",
    type: "paid",
    items: [
      { id: 10, name: "ثومية", price: 3, maxQty: 5 },
      { id: 11, name: "صوص سبايسي", price: 3, maxQty: 5 },
      { id: 12, name: "بطاطس زيادة", price: 8, maxQty: 5 },
      { id: 13, name: "جبنة", price: 4, maxQty: 5 },
    ],
  },

  {
    group: "مشروبات إضافية",
    type: "paid",
    items: [
      { id: 20, name: "بيبسي", price: 5, maxQty: 10 },
      { id: 21, name: "سفن", price: 5, maxQty: 10 },
      { id: 22, name: "ماء", price: 3, maxQty: 10 },
    ],
  },
];
