/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { FaFire, FaCheckCircle, FaStar } from "react-icons/fa";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/dark-wood.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="max-w-5xl mx-auto relative z-10">

        {/* ------------ Title ------------ */}
        <h1 className="text-5xl font-extrabold text-center text-red-600 mb-10">
          من نحن
        </h1>

        {/* ------------ Intro Text ------------ */}
        <p className="text-lg text-gray-300 leading-relaxed text-center mb-10">
          مطعم <span className="text-red-500 font-bold">بزيادة</span> يجمع بين
          النكهة الأصيلة للمشاوي على الفحم والطعم الفريد الذي يترك بصمة لا
          تُنسى. نستخدم أفضل أنواع اللحوم والدجاج، ونعتني بأدق التفاصيل لضمان
          تجربة طعام مميزة ترضي جميع الأذواق.
        </p>

        {/* ------------ Big Hero Image ------------ */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-14 border border-red-900/40">
          <img
            src="/assets/grilled.png"
            alt="مطعم بزيادة"
            className="w-full h-80 object-cover opacity-90"
          />
        </div>

        {/* ------------ Why Choose Us ------------ */}
        <h2 className="text-3xl font-bold text-red-500 mb-6">
          لماذا تختار بزيادة؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-[#121212] border border-red-900/40 p-6 rounded-2xl shadow-lg">
            <FaFire className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-3">مذاق الفحم الأصيل</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              نستخدم الفحم الطبيعي لضمان طعم لا يُقاوم وعلامات شواء أصلية.
            </p>
          </div>

          <div className="bg-[#121212] border border-red-900/40 p-6 rounded-2xl shadow-lg">
            <FaCheckCircle className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-3">جودة عالية</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              لحوم طازجة، توابل خاصة، وإعداد بعناية لرضاء جميع العملاء.
            </p>
          </div>

          <div className="bg-[#121212] border border-red-900/40 p-6 rounded-2xl shadow-lg">
            <FaStar className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-3">خدمة مميزة</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              نهتم بالتفاصيل ونقدّم تجربة طلب سلسة وسريعة عبر الموقع.
            </p>
          </div>
        </div>

        {/* ------------ Vision Section ------------ */}
        <h2 className="text-3xl font-bold text-red-500 mt-16 mb-6">
          رؤيتـنــا
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          أن نكون أحد أفضل مطاعم المشاوي في المنطقة من خلال تقديم نكهات لا
          تُنسى، وجودة عالية، وخدمة تليق بعملائنا الكرام. هدفنا هو أن نجعل من كل
          وجبة تجربة ممتعة ترسم ابتسامة على وجهك.
        </p>

        {/* ------------ Extra Image Grid ------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-16">
          <img
            src="/assets/meal_kabab.jpg"
            className="rounded-xl shadow-lg border border-red-900/30 h-64 w-full object-cover"
          />
          <img
            src="/assets/Big_mix.jpg"
            className="rounded-xl shadow-lg border border-red-900/30 h-64 w-full object-cover"
          />
        </div>

        {/* ------------ CTA ------------ */}
        <div className="text-center mt-10">
          <a
            href="/menu"
            className="
              inline-block px-10 py-4 rounded-full
              bg-red-600 hover:bg-red-700 
              text-white text-xl font-extrabold
              shadow-lg hover:scale-105 active:scale-95 
              transition-all
            "
          >
            تصفّح المنيو
          </a>
        </div>

      </div>
    </motion.div>
  );
}
