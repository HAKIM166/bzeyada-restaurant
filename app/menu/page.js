/* eslint-disable @next/next/no-img-element */
"use client";

import AddToCartButton from "@/components/AddToCartButton";

export default function MenuPage() {
  const menuData = [
    {
      category: "السندوتشات",
      items: [
        { id: 1, name: "صامونة كباب لحم", desc: "صامونة لحم مشوي على الفحم", price: 12, img: "/assets/sandwich_kabab.jpg" },
        { id: 2, name: "صامونة شيش طاووق", desc: "شيش طاووق متبل ومشوي", price: 12, img: "/assets/sandwich_shish.jpg" },
        { id: 3, name: "صامونة شاورما دجاج", desc: "دجاج شاورما طازج ولذيذ", price: 10, img: "/assets/sandwich_shawarma.jpg" },
      ],
    },

    {
      category: "الأطباق الرئيسية",
      items: [
        { id: 4, name: "صحن كباب لحم", desc: "كباب لحم مشوي على الفحم", price: 34, img: "/assets/meal_kabab.jpg" },
        { id: 5, name: "صحن كباب دجاج", desc: "كباب دجاج مشوي", price: 34, img: "/assets/meal_chicken_kabab.jpg" },
        { id: 6, name: "صحن مشكل مشويات", desc: "مزيج من الكباب والشيش والمشاوي", price: 38, img: "/assets/meal_kabab.jpg" },
        { id: 7, name: "صحن مشكل كبير", desc: "حجم كبير من أفضل المشاوي", price: 45, img: "/assets/meal_mix_big.jpg" },
      ],
    },

    {
      category: "الإضافات",
      items: [
        { id: 8, name: "بطاطس بزيادة", desc: "بطاطس مقرمشة ولذيذة", price: 10, img: "/assets/fries.jpg" },
        { id: 9, name: "صوص بزيادة", desc: "الصوص الخاص من بزيادة", price: 5, img: "/assets/sauce_bezeyada.jpg" },
        { id: 10, name: "ثوم", desc: "ثومية منعشة", price: 5, img: "/assets/garlic.jpg" },
        { id: 11, name: "صوص سبايسي", desc: "نكهة حارة ولذيذة", price: 5, img: "/assets/spicy.jpg" },
      ],
    },

    {
      category: "المشروبات",
      items: [
        { id: 12, name: "مشروبات غازية", desc: "بيبسي — سفن — ميرندا", price: 5, img: "/assets/drinks.jpg" },
        { id: 13, name: "كوكاكولا بارد", desc: "كوكاكولا 500 مل", price: 5, img: "/assets/cocacola.jpg" },
        { id: 14, name: "ماء", desc: "ماء بارد منعش", price: 3, img: "/assets/water.jpg" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-right text-white px-6 py-10 animate-fadeIn">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-extrabold text-center mb-12">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a755] to-[#fce4b7]">
          المنيو الفاخــرة
        </span>
      </h1>

      {/* SECTIONS */}
      {menuData.map((section, i) => (
        <div key={i} className="mb-16">

          {/* SECTION TITLE */}
          <h2 className="text-3xl font-bold mb-6 text-[#d4a755] border-r-4 border-[#d4a755] pr-3">
            {section.category}
          </h2>

          {/* ITEMS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="
                  bg-[#161513] rounded-xl border border-[#2d2c2b]
                  shadow-lg overflow-hidden 
                  hover:scale-[1.03] hover:shadow-xl transition-all
                "
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-[#fce4b7]">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-[#d4a755]">
                      {item.price} ريال
                    </span>

                    <AddToCartButton item={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
