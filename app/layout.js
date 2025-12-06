import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/ui/toast";

// استبدال Geist بخط Inter (متوافق مع Next 14)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "بزيادة للمشويات",
  description: "أفضل مشويات على الفحم — اطلب الآن.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-[#050505]`}
      >
        <ToastProvider>
          <AuthProvider>
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
