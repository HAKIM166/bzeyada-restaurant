/* eslint-disable @next/next/no-img-element */
"use client";

import AddToCartButton from "@/components/AddToCartButton";

export default function Home() {
  const bestSellers = [
    { id: 101, name: "كباب لحم", desc: "نكهة فحم أصيلة", price: 22, img: "/assets/kabab.jpg" },
    { id: 102, name: "شيش طاووق", desc: "متبل ومشوي على أصوله", price: 20, img: "/assets/shesh.jpg" },
    { id: 103, name: "مشكل مشويات", desc: "تشكيلة فاخرة من المشاوي", price: 35, img: "/assets/mashwyat.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#0c0b0a] text-right text-white font-sans">

      {/* HERO SECTION */}
      <section
        className="
          relative text-center pt-36 pb-24 
          bg-cover bg-center overflow-hidden
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/assets/hero.jpg')",
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-extrabold mb-4 tracking-wide drop-shadow-xl">
            بــزيــادة للمشــويــات
          </h1>

          <p className="text-2xl opacity-95 mb-10">
            ألذّ مشويات على الفحم — طعم فاخر 🔥  
          </p>

          <div className="flex justify-center gap-6">
            <a
              href="/menu"
              className="
                px-10 py-3 
                bg-gradient-to-r from-[#d4a755] to-[#fce4b7]
                text-black rounded-full text-xl font-extrabold shadow-xl
                hover:scale-105 active:scale-95 transition-all
              "
            >
              تصفّح المنيو
            </a>

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              className="
                px-10 py-3 border-2 border-[#d4a755]
                text-[#fce4b7] rounded-full text-xl font-bold shadow-lg
                hover:bg-[#d4a755] hover:text-black transition-all active:scale-95
              "
            >
              اطلب عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a755] to-[#fce4b7]">
            أشهر الأطباق
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#191715] rounded-xl border border-[#2d2c2b]
                shadow-lg overflow-hidden 
                hover:scale-[1.03] hover:shadow-xl transition-all group
              "
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="p-6">
                <h4 className="text-2xl font-semibold text-[#fce4b7] mb-1">
                  {item.name}
                </h4>
                <p className="text-gray-400 mb-4">{item.desc}</p>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#d4a755]">
                    {item.price} ريال
                  </span>
                  <AddToCartButton item={item} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 max-w-7xl mx-auto rounded-xl px-6 mt-10">
        <h3 className="text-3xl font-bold mb-10 text-center text-[#fce4b7]">
          ليه تختارنا؟
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {[
            { icon: "🔥", title: "مشويات فحم", desc: "نكهة أصيلة لا تُنسى" },
            { icon: "⏱️", title: "توصيل سريع", desc: "يوصل خلال 30 دقيقة" },
            { icon: "🥗", title: "مكونات طازجة", desc: "جودة ممتازة" },
            { icon: "⭐", title: "ثقة العملاء", desc: "تقييمات عالية" },
          ].map((box, i) => (
            <div key={i} className="hover:scale-105 transition-all">
              <div className="text-5xl mb-3">{box.icon}</div>
              <h4 className="text-xl font-bold text-[#fce4b7]">{box.title}</h4>
              <p className="text-gray-400 text-sm">{box.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0908] text-white text-center p-10 mt-20 border-t border-[#2d2c2b]">
        <p className="text-[#fce4b7]">📍 الرياض – حي النسيم</p>
        <p className="text-gray-300">📞 0500000000</p>
        <p className="text-gray-300">📱 واتساب: 0500000000</p>
        <p className="text-gray-500 mt-4">🕒 1PM – 1AM</p>

        <p className="mt-6 text-gray-600 text-sm">
          © 2024 بزيادة للمشويات – جميع الحقوق محفوظة
        </p>
      </footer>
    </div>
  );
}
