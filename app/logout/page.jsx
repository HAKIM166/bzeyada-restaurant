"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // 🧹 Clear ALL user-related data
    localStorage.removeItem("bz-user");
    localStorage.removeItem("bz-cart");
    localStorage.removeItem("bz-payment");
    localStorage.removeItem("bz-delivery");
    localStorage.removeItem("last-order");

    // إعادة التوجيه
    router.replace("/auth/login");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white text-2xl">
      جاري تسجيل الخروج…
    </div>
  );
}
