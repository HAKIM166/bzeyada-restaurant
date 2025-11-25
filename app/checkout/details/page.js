"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DetailsPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (!name || !phone || !address) {
      alert("من فضلك أكمل جميع البيانات");
      return;
    }

    const userData = {
      name,
      phone,
      address,
    };

    localStorage.setItem("bz-user", JSON.stringify(userData));

    router.push("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-center text-4xl font-bold text-[#fce4b7] mb-10">
        بيانات التوصيل
      </h1>

      <div className="max-w-2xl mx-auto space-y-5">
        <input
          type="text"
          placeholder="الاسم الكامل"
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-[#333]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="رقم الجوال"
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-[#333]"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="العنوان بالتفصيل"
          className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-[#333] h-28"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4a755] to-[#fce4b7] text-black font-bold text-lg hover:scale-105 transition"
        >
          متابعة الدفع
        </button>
      </div>
    </div>
  );
}
