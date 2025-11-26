/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const bestSellers = [
    {
      id: 101,
      name: "كباب لحم",
      desc: "مشوي على أصوله",
      price: 22,
      img: "/assets/kabab.jpg",
    },
    {
      id: 102,
      name: "شيش طاووق",
      desc: "متبل ومشوي بنكهة فحم",
      price: 20,
      img: "/assets/shesh.jpg",
    },
    {
      id: 103,
      name: "مشكل مشويات",
      desc: "تشكيلة نارية من المشاوي",
      price: 35,
      img: "/assets/mashwyat.jpg",
    },
  ];

  // =============== Scroll Animation + Parallax ===============
  useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector(".hero-bg");
      if (bg) {
        bg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }

      document.querySelectorAll(".section-reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // ===========================================================

  return (
    <div className="min-h-screen bg-black text-white text-right">
      {/* HERO SECTION */}
      <section className="relative text-center pt-40 pb-32 overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src="/assets/grilled.png"
          className="hero-bg absolute top-0 left-0 w-full h-full object-cover "
        />

        {/* DARK BLACK OVERLAY */}
        <div className="absolute  bg-black/60"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 fade-in">
          <img
            src="/Beziada1 Logo.png"
            alt="Bezida Grill Logo"
            className="mx-auto h-52 sm:h-64 md:h-72 lg:h-80 w-auto drop-shadow-xl"
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-500 mb-4">
            المشاوي على أصولها
          </h1>

          <p className="text-lg sm:text-2xl text-gray-200 mb-8">
            طعم الفحم الحقيقي • نكهة مميّزة • جودة تستحقّها
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a
              href="/menu"
              className="px-8 py-3 text-lg sm:text-xl font-bold bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-xl transform transition duration-150 hover:scale-105 active:scale-95"
              aria-label="تصفح المنيو"
            >
              تصفّح المنيو
            </a>

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-lg sm:text-xl font-bold border border-red-500 text-red-400 hover:bg-red-600 hover:text-white rounded-2xl transform transition duration-150 active:scale-95 flex items-center justify-center gap-2"
              aria-label="اطلب عبر واتساب"
            >
              <span>اطلب عبر واتساب</span>
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>

          {/* small hint / scroll CTA */}
          <div className="mt-10 text-gray-300 text-sm opacity-90">
            انزل للاطّلاع على الأكثر مبيعًا • تحرّك لأسفل
          </div>
        </div>
      </section>
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center text-red-500 mb-12">
          الأكثر مبيعًا
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="section-reveal bg-[#121212] rounded-xl border border-red-900/30 shadow-xl overflow-hidden transition"
            >
              <img src={item.img} className="w-full h-60 object-cover" />

              <div className="p-6">
                <h4 className="text-2xl font-semibold text-red-500">
                  {item.name}
                </h4>
                <p className="text-gray-400 text-sm mb-4">{item.desc}</p>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{item.price} ريال</span>
                  <AddToCartButton item={item} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-10 mt-20 border-t border-red-900/20">
        <p className="text-red-500">📍 الرياض – حي النسيم</p>
        <p className="text-gray-300">📞 0500000000</p>
        <p className="text-gray-300">📱 واتساب: 0500000000</p>
        <p className="text-gray-500 mt-4">🕒 1PM – 1AM</p>
        <p className="text-gray-600 text-sm mt-6">
          © 2024 بزيادة – Grill • BBQ — جميع الحقوق محفوظة
        </p>
      </footer>

      {/* ========== CSS ANIMATIONS ========== */}
      <style jsx global>{`
        /* Fade-in on load */
        .fade-in {
          opacity: 0;
          animation: fadeIn 1.2s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Parallax */
        .hero-bg {
          transition: transform 0.2s linear;
        }

        /* Scroll reveal */
        .section-reveal {
          opacity: 0;
          transform: translateY(25px);
        }
        .section-reveal.visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.7s ease-out;
        }
      `}</style>
    </div>
  );
}
