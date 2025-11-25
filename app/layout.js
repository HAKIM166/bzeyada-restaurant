import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "بزيادة للمشويات",
  description: "أفضل مشويات على الفحم — اطلب الآن.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505]`}
      >
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}