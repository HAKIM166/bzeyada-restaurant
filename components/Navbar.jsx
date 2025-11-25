"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="bg-gradient-to-r from-[#d4a755] to-[#fce4b7]
 text-white py-4 shadow-lg relative z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          بزيادة للمشويات
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg font-semibold">
          <Link href="/" className="hover:text-black transition">
            الرئيسية
          </Link>
          <Link href="/menu" className="hover:text-black transition">
            المنيو
          </Link>
          <Link href="/cart" className="hover:text-black transition">
            السلة
          </Link>
          <Link href="/track" className="hover:text-black transition">
            تتبع الطلب
          </Link>
          <Link href="/my-orders" className="hover:text-black transition">
            طلبــاتــي
          </Link>
        </div>

        {/* WhatsApp Button — Desktop */}
        <a
          href="https://wa.me/966500000000"
          target="_blank"
          className="hidden md:block px-4 py-2 bg-green-700 rounded-xl text-white text-sm font-bold hover:scale-105 transition"
        >
          اطلب واتساب
        </a>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 text-white py-6 px-6 space-y-5 shadow-xl animate-slideDown">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-lg font-semibold hover:text-[#fce4b7] transition"
          >
            الرئيسية
          </Link>

          <Link
            href="/menu"
            onClick={() => setOpen(false)}
            className="block text-lg font-semibold hover:text-[#fce4b7] transition"
          >
            المنيو
          </Link>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="block text-lg font-semibold hover:text-[#fce4b7] transition"
          >
            السلة
          </Link>

          <Link
            href="/track"
            onClick={() => setOpen(false)}
            className="block text-lg font-semibold hover:text-[#fce4b7] transition"
          >
            تتبع الطلب
          </Link>
          <Link
            href="/my-orders"
            onClick={() => setOpen(false)}
            className="block text-lg font-semibold hover:text-[#fce4b7] transition"
          >
            طلبــاتــي
          </Link>

          <a
            href="https://wa.me/966500000000"
            target="_blank"
            className="block text-center py-3 bg-gradient-to-r from-[#d4a755] to-[#fce4b7] text-black font-bold rounded-full hover:scale-105 transition"
          >
            اطلب واتساب
          </a>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
    </nav>
  );
}
