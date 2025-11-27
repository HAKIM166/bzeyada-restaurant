/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="
        min-h-screen text-white px-6 py-20
        bg-[url('/assets/dark-wood.jpg')]
        bg-cover bg-center bg-fixed
        flex flex-col items-center justify-center
        text-center
      "
    >
      {/* Error Number */}
      <h1 className="text-[120px] font-extrabold text-red-600 drop-shadow-xl leading-none">
        404
      </h1>

      {/* Title */}
      <h2 className="text-3xl font-bold text-red-400 mt-4 mb-4">
        الصفحة غير موجودة
      </h2>

      {/* Description */}
      <p className="text-gray-300 max-w-xl text-lg mb-10">
        يبدو أنك حاولت زيارة صفحة غير متاحة أو تم نقلها.  
        يمكنك الرجوع للصفحة الرئيسية أو متابعة تصفّح الموقع.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="
          bg-red-600 hover:bg-red-700
          px-10 py-4 rounded-full
          text-white text-xl font-extrabold
          shadow-lg hover:scale-105 active:scale-95
          transition-all
        "
      >
        العودة للرئيسية
      </Link>

    </motion.div>
  );
}
