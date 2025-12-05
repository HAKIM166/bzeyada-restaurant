export async function GET() {
  return Response.json({
    success: true,
    data: [
      //-----------------------------------------
      // 🟨 القسم 1 — الأصناف الرئيسية
      //-----------------------------------------
      {
        id: "cat_main",
        category: "الأصناف الرئيسية",
        items: [
          {
            id: "meal_kabab",
            name: "صحن كباب لحم",
            desc: "صحن كباب مشوي على الفحم يقدم مع البطاطس والسلطة",
            price: 34,
            calories: 395,
            img: "/assets/menu/meal_kabab.jpg",
          },
          {
            id: "meal_mix",
            name: "صحن مشكل مشويات",
            desc: "كباب - طاووق - شيش - بطاطس - سلطة",
            price: 35,
            calories: 458,
            img: "/assets/menu/meal_mix.jpg",
          },
          {
            id: "sandwich_kabab",
            name: "ساندويتش كباب لحم",
            desc: "خبز عربي محشو كباب لحم مشوي",
            price: 12,
            calories: 191,
            img: "/assets/menu/sandwich_kabab.jpg",
          },
          {
            id: "sandwich_shawarma",
            name: "ساندويتش شاورما دجاج",
            desc: "شاورما دجاج متبّلة مع المايونيز والبطاطس",
            price: 10,
            calories: 252,
            img: "/assets/menu/sandwich_shawarma.jpg",
          },
          {
            id: "sandwich_shish",
            name: "ساندويتش شيش طاووق",
            desc: "شيش طاووق مشوي يقدم مع الخضار والمخلل",
            price: 12,
            calories: 340,
            img: "/assets/menu/sandwich_shish.jpg",
          },
          {
            id: "fries",
            name: "بطاطس مقلية",
            desc: "بطاطس مقرمشة مقدمة طازجة",
            price: 9,
            calories: 150,
            img: "/assets/menu/fries.jpg",
          },
        ],
      },

      //-----------------------------------------
      // 🟦 القسم 2 — الصوصات
      //-----------------------------------------
      {
        id: "cat_sauces",
        category: "الصوصات",
        items: [
          {
            id: "garlic_sauce",
            name: "صوص الثوم",
            desc: "صوص ثوم لذيذ",
            price: 3,
            calories: 5,
            img: "/assets/menu/garlic.jpg",
          },
          {
            id: "spicy_sauce",
            name: "صوص سبايسي",
            desc: "صوص فلفل حار",
            price: 3,
            calories: 5,
            img: "/assets/menu/spicy.jpg",
          },
          {
            id: "bezyada_sauce",
            name: "صوص زياده",
            desc: "صوص خاص لمطعمنا",
            price: 3,
            calories: 5,
            img: "/assets/menu/sauce_bezeyada.jpg",
          },
        ],
      },

      //-----------------------------------------
      // 🟦 القسم 3 — المشروبات
      //-----------------------------------------
      {
        id: "cat_drinks",
        category: "المشروبات",
        items: [
          {
            id: "water",
            name: "ماء",
            desc: "مياه نقية باردة",
            price: 1,
            calories: 0,
            img: "/assets/menu/water.jpg",
          },
          {
            id: "soft_drinks",
            name: "مشروبات غازية",
            desc: "بيبسي / سفن أب / ميرندا",
            price: 5,
            calories: 150,
            img: "/assets/menu/drinks.jpg",
          },
          {
            id: "karkade",
            name: "كركديه بارد",
            desc: "كركديه منعش بنكهة مميزة",
            price: 5,
            calories: 120,
            img: "/assets/menu/cocacola.jpg",
          },
        ],
      },
    ],
  });
}
