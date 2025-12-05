import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";   // ⭐ IMPORT جديد
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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505]`}
      >
        <ToastProvider>
          <AuthProvider> {/* ⭐ أضفناها هنا */}
            <CartProvider>
              <Navbar />
              <main>{children}</main>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
