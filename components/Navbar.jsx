/* eslint-disable @next/next/no-img-element */
"use client";

import {
  FaWhatsapp,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const hideMenu = pathname.startsWith("/auth");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".mobile-toggle")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  const showFloatingCart =
    !hideMenu &&
    (pathname === "/" || pathname === "/menu") &&
    cartCount > 0;

  const handleLogout = () => {
    logout();
    router.push("/");
    setOpen(false);
  };

  const activeClass = `
    bg-gradient-to-r from-red-700/40 to-red-600/30 
    border-red-500/40 shadow-lg hover:from-red-700/50 hover:to-red-600/40
  `;

  const normalClass = `
    bg-white/5 border-white/10 hover:bg-white/10
  `;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all ${
          scrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="بزيادة"
              className="h-12 sm:h-16 md:h-20 lg:h-16 brightness-110 drop-shadow-[0_0_15px_rgba(255,0,0,0.35)] transition-all duration-300"
            />
          </Link>

          {/* Desktop Menu */}
          {!hideMenu && (
            <div className="hidden md:flex gap-10 text-lg font-semibold text-white items-center">

              <Link
                href="/"
                className={`${pathname === "/" ? "text-red-500 underline underline-offset-4" : "hover:text-red-500"}`}
              >
                الرئيسية
              </Link>

              <Link
                href="/menu"
                className={`${pathname === "/menu" ? "text-red-500 underline underline-offset-4" : "hover:text-red-500"}`}
              >
                المنيو
              </Link>

              <Link
                href="/cart"
                className="relative hover:text-red-500 transition"
              >
                <ShoppingCart size={28} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/track"
                className={`${pathname === "/track" ? "text-red-500 underline" : "hover:text-red-500"}`}
              >
                تتبع الطلب
              </Link>

              <Link
                href="/my-orders"
                className={`${pathname === "/my-orders" ? "text-red-500 underline" : "hover:text-red-500"}`}
              >
                طلبــــاتي
              </Link>

              {/* USER */}
              {!user ? (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:scale-105 transition shadow-lg"
                >
                  <FaSignInAlt /> تسجيل الدخول
                </Link>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition shadow-md border border-white/10"
                  >
                    <FaUserCircle className="text-2xl" />
                    {user.name.split(" ")[0]}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
                  >
                    <FaSignOutAlt /> خروج
                  </button>
                </>
              )}

              <a
                href="https://wa.me/966500000000"
                target="_blank"
                className="flex px-5 py-2.5 bg-green-600 rounded-xl text-white font-bold hover:bg-green-700 transition gap-2 items-center shadow-lg"
              >
                اطلب واتساب <FaWhatsapp className="text-2xl" />
              </a>
            </div>
          )}

          {/* Mobile Toggle */}
          {!hideMenu && (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white mobile-toggle"
            >
              {open ? <X size={32} /> : <Menu size={32} />}
            </button>
          )}
        </div>

        {/* ⭐⭐⭐ MOBILE MENU ⭐⭐⭐ */}
        {open && !hideMenu && (
          <div className="
            mobile-menu md:hidden bg-[#181818]/95 text-white 
            py-5 px-5 shadow-xl border-t border-white/10 
            backdrop-blur-md animate-slideDown
          ">

            {/* روابط الصفحات */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`block w-full text-right px-4 py-3 rounded-lg text-base font-semibold border transition
                ${pathname === "/" ? activeClass : normalClass}`}
            >
              الرئيسية
            </Link>

            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className={`block w-full text-right px-4 py-3 rounded-lg text-base font-semibold border transition
                ${pathname === "/menu" ? activeClass : normalClass}`}
            >
              المنيو
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-semibold border transition
                ${pathname === "/cart" ? activeClass : normalClass}`}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <span>السلة</span>
              </div>
              {cartCount > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/track"
              onClick={() => setOpen(false)}
              className={`block w-full text-right px-4 py-3 rounded-lg text-base font-semibold border transition
                ${pathname === "/track" ? activeClass : normalClass}`}
            >
              تتبع الطلب
            </Link>

            <Link
              href="/my-orders"
              onClick={() => setOpen(false)}
              className={`block w-full text-right px-4 py-3 rounded-lg text-base font-semibold border transition
                ${pathname === "/my-orders" ? activeClass : normalClass}`}
            >
              طلبــــاتي
            </Link>

            {/* ⭐⭐ زر تسجيل الدخول — تعديل جمالي محترف ⭐⭐ */}
            {!user && (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="
                  block w-full text-center 
                  mt-6 mb-2
                  py-3 
                  bg-red-600 
                  text-white 
                  text-lg 
                  rounded-2xl 
                  shadow-lg 
                  font-bold 
                  hover:bg-red-700 
                  transition 
                  border border-red-700/40
                "
              >
                <FaSignInAlt className="inline-block ml-2 text-xl" />
                تسجيل الدخول
              </Link>
            )}

            {/* USER GRID */}
            {user && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center justify-center bg-white/10 rounded-xl border border-white/10 py-3 hover:bg-white/20 transition"
                >
                  <FaUserCircle className="text-2xl mb-1" />
                  <span className="text-sm">{user.name.split(" ")[0]}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center bg-red-600 rounded-xl py-3 hover:bg-red-700 transition text-white"
                >
                  <FaSignOutAlt className="text-xl mb-1" />
                  <span className="text-sm">خروج</span>
                </button>

                <a
                  href="https://wa.me/966500000000"
                  className="flex flex-col items-center justify-center bg-green-600 rounded-xl py-3 hover:bg-green-700 transition text-white"
                >
                  <FaWhatsapp className="text-2xl mb-1" />
                  <span className="text-sm">واتساب</span>
                </a>
              </div>
            )}

          </div>
        )}
      </nav>

      {/* Floating Cart */}
      {showFloatingCart && (
        <Link
          href="/cart"
          className="fixed bottom-6 right-6 z-50 md:hidden bg-red-600 text-white shadow-2xl rounded-full w-16 h-16 flex items-center justify-center animate-bounceSlow"
        >
          <div className="relative">
            <ShoppingCart size={32} />
            <span className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 text-sm font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </Link>
      )}
    </>
  );
}
