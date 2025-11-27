"use client";

import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-20
        bg-[url('/assets/dark-wood.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-red-600 mb-10">
          تواصل معنا
        </h1>

        <p className="text-lg text-gray-300 text-center mb-12 leading-relaxed">
          تقدر تتواصل مع مطعم{" "}
          <span className="text-red-500 font-bold">بزيادة</span>
          عبر البيانات التالية أو من خلال الفورم أسفل الصفحة.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Phone */}
          <div className="bg-[#111] p-6 rounded-2xl shadow-lg border border-red-900/40 text-center">
            <FaPhoneAlt className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-red-400">اتصال</h3>
            <p className="text-gray-300 text-lg">0500000000</p>
          </div>

          {/* WhatsApp */}
          <div className="bg-[#111] p-6 rounded-2xl shadow-lg border border-red-900/40 text-center">
            <FaWhatsapp className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-red-400">واتساب</h3>
            <p className="text-gray-300 text-lg">0500000000</p>
          </div>

          {/* Location */}
          <div className="bg-[#111] p-6 rounded-2xl shadow-lg border border-red-900/40 text-center">
            <FaMapMarkerAlt className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-red-400">العنوان</h3>
            <p className="text-gray-300 text-lg">الرياض – حي النسيم</p>
          </div>
        </div>

                {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-red-600 mb-10">
            موقعنا على الخريطة
        </h1>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-16 border border-red-900/40">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7205.6581900359815!2d49.59751848771132!3d25.443976700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e37bd0052babce3%3A0xdae7baa399231549!2z2YXYt9i52YUg2KjYstmK2KfYr9mHINmB2LHYuSDYp9mE2LHYp9i02K_ZitmH!5e0!3m2!1sar!2seg!4v1764185848885!5m2!1sar!2seg"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Form */}
        <h2 className="text-3xl font-bold text-red-500 mb-6">أرسل رسالة</h2>

        <form className="bg-[#111] p-8 rounded-2xl shadow-xl border border-red-900/40">
          <div className="mb-6">
            <label className="text-gray-300 mb-2 block">الاسم الكامل</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-black border border-red-900/40 text-white"
              placeholder="اكتب اسمك هنا"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 mb-2 block">رقم الجوال</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-black border border-red-900/40 text-white"
              placeholder="05XXXXXXXX"
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-300 mb-2 block">رسالتك</label>
            <textarea
              className="w-full p-3 rounded-lg bg-black border border-red-900/40 text-white h-40"
              placeholder="اكتب رسالتك هنا..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="
              w-full bg-red-600 hover:bg-red-700 
              text-xl font-bold py-3 rounded-xl 
              shadow-lg hover:scale-105 transition-all
            "
          >
            إرسال الرسالة
          </button>
        </form>
      </div>
    </motion.div>
  );
}
