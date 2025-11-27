/* eslint-disable @next/next/no-img-element */
"use client";

import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation"; // ⭐ مهم جداً

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const pathname = usePathname(); // ⭐ معرفة الصفحة الحالية

  // ⭐ عدد السلة
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // ⭐ زر السلة يظهر فقط في: الرئيسية + المنيو
  const showFloatingCart =
    (pathname === "/" || pathname === "/menu") && cartCount > 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all 
        ${scrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

          {/* ===== LOGO ===== */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="بزيادة"
              className="h-12 w-auto sm:h-16 md:h-20 lg:h-16 brightness-110 
              drop-shadow-[0_0_15px_rgba(255,0,0,0.35)] transition-all duration-300"
            />
          </Link>

          {/* ===== Desktop Menu ===== */}
          <div className="hidden md:flex gap-8 text-lg font-semibold text-white items-center">

            <Link
              href="/"
              onClick={() => setActiveLink("/")}
              className={`transition ${activeLink === "/" ? "text-red-500 underline underline-offset-4" : "hover:text-red-500"}`}
            >
              الرئيسية
            </Link>

            <Link
              href="/menu"
              onClick={() => setActiveLink("/menu")}
              className={`transition ${activeLink === "/menu" ? "text-red-500 underline underline-offset-4" : "hover:text-red-500"}`}
            >
              المنيو
            </Link>

            {/* ⭐⭐ السلة Desktop ⭐⭐ */}
            <Link
              href="/cart"
              onClick={() => setActiveLink("/cart")}
              className="relative hover:text-red-500 transition"
            >
              <ShoppingCart size={28} />

              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-3 bg-red-600 text-white 
                  text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/track"
              onClick={() => setActiveLink("/track")}
              className={`transition ${activeLink === "/track" ? "text-red-500 underline" : "hover:text-red-500"}`}
            >
              تتبع الطلب
            </Link>

            <Link
              href="/my-orders"
              onClick={() => setActiveLink("/my-orders")}
              className={`transition ${activeLink === "/my-orders" ? "text-red-500 underline" : "hover:text-red-500"}`}
            >
              طلبــاتــي
            </Link>

            {/* WhatsApp Button Desktop */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex px-4 py-2 bg-red-600 rounded-lg text-white font-bold
              hover:bg-red-700 transition gap-2 items-center"
            >
              اطلب واتساب
              <FaWhatsapp className="text-2xl" />
            </a>
          </div>

          {/* ===== Mobile Toggle ===== */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white cursor-pointer">
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* ===== Mobile Menu ===== */}
        {open && (
          <div className="md:hidden bg-black/95 text-white py-6 px-6 space-y-5 shadow-xl animate-slideDown">

            <Link
              href="/"
              onClick={() => { setActiveLink("/"); setOpen(false); }}
              className={`block text-lg font-semibold ${activeLink === "/" ? "text-red-500 underline" : "hover:text-red-500"}`}
            >
              الرئيسية
            </Link>

            <Link
              href="/menu"
              onClick={() => { setActiveLink("/menu"); setOpen(false); }}
              className={`block text-lg font-semibold ${activeLink === "/menu" ? "text-red-500 underline" : "hover:text-red-500"}`}
            >
              المنيو
            </Link>

            {/* ⭐⭐ Mobile Cart ⭐⭐ */}
            <Link
              href="/cart"
              onClick={() => { setActiveLink("/cart"); setOpen(false); }}
              className="block text-lg font-semibold flex items-center gap-3 hover:text-red-500"
            >
              <ShoppingCart size={26} />
              <span>السلة</span>

              {cartCount > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/track"
              onClick={() => { setActiveLink("/track"); setOpen(false); }}
              className={`block text-lg font-semibold ${activeLink === "/track" ? "text-red-500 underline" : "hover:text-red-500"}`}
            >
              تتبع الطلب
            </Link>

            <Link
              href="/my-orders"
              onClick={() => { setActiveLink("/my-orders"); setOpen(false); }}
              className={`block text-lg font-semibold ${activeLink === "/my-orders" ? "text-red-500 underline" : "hover:text-red-500"}`}
            >
              طلبــاتــي
            </Link>

            {/* WhatsApp Mobile */}
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 
              w-full text-center py-3 bg-red-600 text-white font-bold rounded-lg 
              hover:bg-red-700 transition"
            >
              اطلب واتساب
              <FaWhatsapp className="text-xl" />
            </a>
          </div>
        )}
      </nav>

      {/* ⭐⭐⭐ زر السلة العائم — يظهر فقط في الرئيسية + المنيو ⭐⭐⭐ */}
      {showFloatingCart && (
        <Link
          href="/cart"
          className="
            fixed bottom-6 right-6 z-[9999] md:hidden
            bg-red-600 text-white shadow-2xl rounded-full 
            w-16 h-16 flex items-center justify-center 
            animate-bounceSlow
          "
        >
          <div className="relative">
            <ShoppingCart size={32} />

            <span
              className="
                absolute -top-2 -right-2 bg-black text-white 
                w-6 h-6 text-sm font-bold rounded-full 
                flex items-center justify-center
              "
            >
              {cartCount}
            </span>
          </div>
        </Link>
      )}
    </>
  );
}
