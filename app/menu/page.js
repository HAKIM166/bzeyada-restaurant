/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⭐ Load from backend
  useEffect(() => {
    async function loadData() {
      try {
        const [menuRes, offersRes] = await Promise.all([
          fetch("/api/menu"),
          fetch("/api/offers"),
        ]);

        const menuData = await menuRes.json();
        const offersData = await offersRes.json();

        // ⭐⭐⭐ التعديل المهم هنا فقط
        setMenu(menuData.data || []);
        setOffers(offersData.data || []);

        setLoading(false);
      } catch (err) {
        setError("حدث خطأ في تحميل المنيو ❌");
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
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
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10">
        <motion.h1
          variants={titleVariant}
          className="text-5xl font-extrabold text-center mb-10 text-red-600"
        >
          منيو بزيادة
        </motion.h1>

        {/* 🔄 Loading */}
        {loading && (
          <p className="text-center text-gray-300 text-xl mt-20">
            جاري تحميل المنيو...
          </p>
        )}

        {/* ❌ Error */}
        {error && (
          <p className="text-center text-red-500 text-xl mt-20">{error}</p>
        )}

        {!loading && !error && (
          <>
            {/* ⭐ عروض */}
            {offers.length > 0 && (
              <motion.section
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
                  % عروضنا المميزة
                </motion.h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                  {offers.map((offer) => (
                    <motion.div
                      key={offer.id}
                      variants={cardVariant}
                      className="
                        bg-[#1a1a1a]/85 rounded-xl
                        border border-red-900/30 shadow
                        hover:scale-[1.03] transition-all duration-300
                        overflow-hidden
                      "
                    >
                      <img
                        src={offer.img}
                        alt={offer.title}
                        className="w-full object-cover md:h-50 max-sm:h-20 lg:h-55 h-39"
                      />

                      <div className="p-3 max-sm:p-2">
                        <h3 className="text-lg max-sm:text-sm font-bold text-red-500 leading-tight">
                          {offer.title}
                        </h3>

                        <p className="text-gray-300 text-xs max-sm:text-[10px] mt-1 leading-tight">
                          {offer.desc}
                        </p>

                        <div className="flex justify-between items-center mt-3 max-sm:mt-2">
                          <span className="text-base max-sm:text-sm font-extrabold text-white">
                            {offer.price} ريال
                          </span>

                          <div className="scale-90 max-sm:scale-75">
                            <AddToCartButton item={offer} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ⭐ الأقسام الرئيسية */}
            {menu.map((section, i) => (
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
                      <a href={`/menu/${item.id}`}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full object-cover md:h-50 max-sm:h-20 lg:h-55 h-39"
                        />
                      </a>

                      <div className="p-3 max-sm:p-2">
                        <h3 className="text-lg max-sm:text-sm font-bold text-red-500 leading-tight wrap-break-word">
                          {item.name}
                        </h3>

                        <p className="text-gray-300 text-xs max-sm:text-[10px] mt-1 leading-tight wrap-break-word">
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
          </>
        )}
      </div>
    </motion.div>
  );
}
