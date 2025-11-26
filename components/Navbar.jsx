/* eslint-disable @next/next/no-img-element */
"use client";

import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all
        ${scrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"}
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* ===== LOGO ===== */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="بزيادة"
            className="
              h-12 w-auto sm:h-16 md:h-20 lg:h-16
              brightness-110
              drop-shadow-[0_0_15px_rgba(255,0,0,0.35)]
              transition-all duration-300
            "
          />
        </Link>

        {/* ===== Desktop Menu ===== */}
        <div className="hidden md:flex gap-8 text-lg font-semibold text-white items-center">

          <Link
            href="/"
            onClick={() => setActiveLink("/")}
            className={`
              transition 
              ${activeLink === "/" 
                ? "text-red-500 underline underline-offset-4" 
                : "hover:text-red-500"}
            `}
          >
            الرئيسية
          </Link>

          <Link
            href="/menu"
            onClick={() => setActiveLink("/menu")}
            className={`
              transition 
              ${activeLink === "/menu" 
                ? "text-red-500 underline underline-offset-4" 
                : "hover:text-red-500"}
            `}
          >
            المنيو
          </Link>

          <Link
            href="/cart"
            onClick={() => setActiveLink("/cart")}
            className={`
              transition 
              ${activeLink === "/cart" 
                ? "text-red-500 underline underline-offset-4" 
                : "hover:text-red-500"}
            `}
          >
            السلة
          </Link>

          <Link
            href="/track"
            onClick={() => setActiveLink("/track")}
            className={`
              transition 
              ${activeLink === "/track" 
                ? "text-red-500 underline underline-offset-4" 
                : "hover:text-red-500"}
            `}
          >
            تتبع الطلب
          </Link>

          <Link
            href="/my-orders"
            onClick={() => setActiveLink("/my-orders")}
            className={`
              transition 
              ${activeLink === "/my-orders" 
                ? "text-red-500 underline underline-offset-4" 
                : "hover:text-red-500"}
            `}
          >
            طلبــاتــي
          </Link>
        </div>

        {/* WhatsApp Button (Desktop) */}
        <a
          href="https://wa.me/966500000000"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden md:flex px-4 py-2 bg-red-600 rounded-lg text-white font-bold
            hover:bg-red-700 transition gap-2 items-center justify-center
          "
        >
          <span>اطلب واتساب</span>
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white cursor-pointer"
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* ===== Mobile Menu ===== */}
      {open && (
        <div className="md:hidden bg-black/95 text-white py-6 px-6 space-y-5 shadow-xl animate-slideDown">

          <Link
            href="/"
            onClick={() => {
              setActiveLink("/");
              setOpen(false);
            }}
            className={`block text-lg font-semibold ${
              activeLink === "/"
                ? "text-red-500 underline underline-offset-4"
                : "hover:text-red-500"
            }`}
          >
            الرئيسية
          </Link>

          <Link
            href="/menu"
            onClick={() => {
              setActiveLink("/menu");
              setOpen(false);
            }}
            className={`block text-lg font-semibold ${
              activeLink === "/menu"
                ? "text-red-500 underline underline-offset-4"
                : "hover:text-red-500"
            }`}
          >
            المنيو
          </Link>

          <Link
            href="/cart"
            onClick={() => {
              setActiveLink("/cart");
              setOpen(false);
            }}
            className={`block text-lg font-semibold ${
              activeLink === "/cart"
                ? "text-red-500 underline underline-offset-4"
                : "hover:text-red-500"
            }`}
          >
            السلة
          </Link>

          <Link
            href="/track"
            onClick={() => {
              setActiveLink("/track");
              setOpen(false);
            }}
            className={`block text-lg font-semibold ${
              activeLink === "/track"
                ? "text-red-500 underline underline-offset-4"
                : "hover:text-red-500"
            }`}
          >
            تتبع الطلب
          </Link>

          <Link
            href="/my-orders"
            onClick={() => {
              setActiveLink("/my-orders");
              setOpen(false);
            }}
            className={`block text-lg font-semibold ${
              activeLink === "/my-orders"
                ? "text-red-500 underline underline-offset-4"
                : "hover:text-red-500"
            }`}
          >
            طلبــاتــي
          </Link>

          {/* WhatsApp (Mobile) */}
          <a
            href="https://wa.me/966500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center gap-2 
              w-full text-center py-3 
              bg-red-600 text-white font-bold rounded-lg 
              hover:bg-red-700 transition
            "
          >
            <span>اطلب واتساب</span>
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
      )}
    </nav>
  );
}
