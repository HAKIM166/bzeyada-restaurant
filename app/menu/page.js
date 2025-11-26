/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";

export default function MenuPage() {
  /* نفس الداتا بدون تعديل */
  const menuData = [
    {
      category: "السندوتشات",
      items: [
        {
          id: 1,
          name: "صامونة كباب لحم",
          desc: "كباب مشوي على الفحم",
          price: 12,
          img: "/assets/sandwich_kabab.jpg",
        },
        {
          id: 2,
          name: "صامونة شيش طاووق",
          desc: "شيش طاووق متبل ومشوي",
          price: 12,
          img: "/assets/sandwich_shish.jpg",
        },
        {
          id: 3,
          name: "صامونة شاورما دجاج",
          desc: "دجاج شاورما طازج ولذيذ",
          price: 10,
          img: "/assets/sandwich_shawarma.jpg",
        },
      ],
    },

    {
      category: "الأطباق الرئيسية",
      items: [
        {
          id: 4,
          name: "صحن كباب لحم",
          desc: "لحم مشوي بنكهة فحم قوية",
          price: 34,
          img: "/assets/meal_kabab.jpg",
        },
        {
          id: 5,
          name: "صحن كباب دجاج",
          desc: "قطع دجاج مشوي بعناية",
          price: 34,
          img: "/assets/meal_chicken_kabab.jpg",
        },
        {
          id: 6,
          name: "صحن مشكل مشويات",
          desc: "مزيج فاخر من المشاوي",
          price: 38,
          img: "/assets/meal_kabab.jpg",
        },
        {
          id: 7,
          name: "صحن مشكل كبير",
          desc: "حجم عائلي من أفضل المشاوي",
          price: 45,
          img: "/assets/Big_mix.jpg",
        },
      ],
    },

    {
      category: "الإضافات",
      items: [
        {
          id: 8,
          name: "بطاطس بزيادة",
          desc: "بطاطس مقرمشة طازجة",
          price: 10,
          img: "/assets/fries.jpg",
        },
        {
          id: 9,
          name: "صوص بزيادة",
          desc: "الصوص الخاص",
          price: 5,
          img: "/assets/sauce_bezeyada.jpg",
        },
        {
          id: 10,
          name: "ثومية",
          desc: "طعم مميز ولذيذ",
          price: 5,
          img: "/assets/garlic.jpg",
        },
        {
          id: 11,
          name: "صوص سبايسي",
          desc: "نكهة حارة",
          price: 5,
          img: "/assets/spicy.jpg",
        },
      ],
    },

    {
      category: "المشروبات",
      items: [
        {
          id: 12,
          name: "مشروبات غازية",
          desc: "بيبسي — سفن — ميرندا",
          price: 5,
          img: "/assets/drinks.jpg",
        },
        {
          id: 13,
          name: "كوكاكولا",
          desc: "كوكاكولا باردة",
          price: 5,
          img: "/assets/cocacola.jpg",
        },
        {
          id: 14,
          name: "ماء",
          desc: "ماء منعش",
          price: 3,
          img: "/assets/water.jpg",
        },
      ],
    },
  ];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }, // أسرع
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }, // أخف
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }, // أخف
  };

  const sectionTitleVariant = {
    hidden: { opacity: 0, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={titleVariant}
      className="
        min-h-screen text-white px-6 py-24 relative
        bg-[url('/assets/wood1.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      {/* تخفيف الـ overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10">
        {/* Title */}
        <motion.h1
          variants={titleVariant}
          className="text-5xl font-extrabold text-center mb-10 text-red-600 "
        >
          منيو بزيادة
        </motion.h1>

        {menuData.map((section, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariant}
            className="mb-20"
          >
            <motion.h2
              variants={sectionTitleVariant}
              className="text-3xl font-bold mb-6 text-red-500 border-r-4 border-red-600 pr-3"
            >
              {section.category}
            </motion.h2>

            {/* نفس الـ grid — كروت جنب بعض */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {section.items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariant}
                  className="
                    bg-[#1a1a1a]/85 rounded-xl
                    border border-red-900/30 shadow
                    hover:scale-[1.03] transition-all duration-300
                    overflow-hidden
                  "
                >
                  {/* IMG optimized */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="
                      w-full object-cover
                      md:h-50 max-sm:h-20 lg:h-55 h-39
                      
                    "
                  />

                  <div className="p-3 max-sm:p-2">
                    {/* Title — أصغر للموبايل */}
                    <h3 className="text-lg max-sm:text-sm font-bold text-red-500 leading-tight break-words">
                      {item.name}
                    </h3>

                    {/* desc — أصغر بدون تمدد */}
                    <p className="text-gray-300 text-xs max-sm:text-[10px] mt-1 leading-tight break-words">
                      {item.desc}
                    </p>

                    <div className="flex justify-between items-center mt-3 max-sm:mt-2">
                      <span className="text-base max-sm:text-sm font-extrabold text-white">
                        {item.price} ريال
                      </span>

                      <div className="scale-90 max-sm:scale-75">
                        <AddToCartButton item={item} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
