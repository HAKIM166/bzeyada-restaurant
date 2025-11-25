/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";

export default function MenuPage() {
   const menuData = [
    {
      category: "السندوتشات",
      items: [
        { id: 1, name: "صامونة كباب لحم", desc: "كباب مشوي على الفحم", price: 12, img: "/assets/sandwich_kabab.jpg" },
        { id: 2, name: "صامونة شيش طاووق", desc: "شيش طاووق متبل ومشوي", price: 12, img: "/assets/sandwich_shish.jpg" },
        { id: 3, name: "صامونة شاورما دجاج", desc: "دجاج شاورما طازج ولذيذ", price: 10, img: "/assets/sandwich_shawarma.jpg" },
      ],
    },

    {
      category: "الأطباق الرئيسية",
      items: [
        { id: 4, name: "صحن كباب لحم", desc: "لحم مشوي بنكهة فحم قوية", price: 34, img: "/assets/meal_kabab.jpg" },
        { id: 5, name: "صحن كباب دجاج", desc: "قطع دجاج مشوي بعناية", price: 34, img: "/assets/meal_chicken_kabab.jpg" },
        { id: 6, name: "صحن مشكل مشويات", desc: "مزيج فاخر من المشاوي", price: 38, img: "/assets/meal_kabab.jpg" },
        { id: 7, name: "صحن مشكل كبير", desc: "حجم عائلي من أفضل المشاوي", price: 45, img: "/assets/meal_mix_big.jpg" },
      ],
    },

    {
      category: "الإضافات",
      items: [
        { id: 8, name: "بطاطس بزيادة", desc: "بطاطس مقرمشة طازجة", price: 10, img: "/assets/fries.jpg" },
        { id: 9, name: "صوص بزيادة", desc: "الصوص الخاص", price: 5, img: "/assets/sauce_bezeyada.jpg" },
        { id: 10, name: "ثومية", desc: "طعم مميز ولذيذ", price: 5, img: "/assets/garlic.jpg" },
        { id: 11, name: "صوص سبايسي", desc: "نكهة حارة", price: 5, img: "/assets/spicy.jpg" },
      ],
    },

    {
      category: "المشروبات",
      items: [
        { id: 12, name: "مشروبات غازية", desc: "بيبسي — سفن — ميرندا", price: 5, img: "/assets/drinks.jpg" },
        { id: 13, name: "كوكاكولا", desc: "كوكاكولا باردة", price: 5, img: "/assets/cocacola.jpg" },
        { id: 14, name: "ماء", desc: "ماء منعش", price: 3, img: "/assets/water.jpg" },
      ],
    },
  ];
  /* Variants for smooth stagger animation */
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const sectionTitleVariant = {
    hidden: { opacity: 0, x: 35 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={titleVariant}
      className="
        min-h-screen text-white px-6 py-16 relative
        bg-[url('/assets/wood1.jpg')]
        bg-cover bg-center bg-fixed
      "
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10">

        {/* PAGE TITLE */}
        <motion.h1
          variants={titleVariant}
          className="text-5xl font-extrabold text-center mb-16 text-red-600 drop-shadow-lg"
        >
          المنيو الفاخــرة
        </motion.h1>

        {/* MENU SECTIONS */}
        {menuData.map((section, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariant}
            className="mb-20"
          >

            {/* Section Title */}
            <motion.h2
              variants={sectionTitleVariant}
              className="text-3xl font-bold mb-6 text-red-500 border-r-4 border-red-600 pr-3 drop-shadow-md"
            >
              {section.category}
            </motion.h2>

            {/* Items */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
  {section.items.map((item) => (
    <motion.div
      key={item.id}
      variants={cardVariant}
      className="
        bg-[#1a1a1a]/80 backdrop-blur-md rounded-xl
        border border-red-900/30 shadow-lg 
        hover:scale-[1.04] hover:shadow-red-900/50 
        transition-all duration-300 overflow-hidden

        /* موبايل */
        max-sm:h-[220px]
      "
    >

      {/* IMG */}
      <img
        src={item.img}
        alt={item.name}
        className="
          w-full 
          h-50 object-cover

          /* موبايل */
          max-sm:h-24
        "
      />

      {/* CONTENT */}
      <div className="p-3 max-sm:p-2">

        <h3 className="text-lg max-sm:text-base font-bold text-red-500">
          {item.name}
        </h3>

        <p className="text-gray-300 text-xs max-sm:text-[10px] mt-1">
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
