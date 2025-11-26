"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

    const userData = { name, phone, address };
    localStorage.setItem("bz-user", JSON.stringify(userData));

    router.push("/checkout/payment");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        min-h-screen text-white px-6 py-20 relative
        bg-[url('/assets/dark-wood.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <h1 className="text-center text-5xl font-extrabold text-red-600 mb-14">
        بيانات التوصيل
      </h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <input
          type="text"
          placeholder="الاسم الكامل"
          className="
            w-full p-4 rounded-xl 
            bg-[#121212] border border-red-900/40
            focus:border-red-600 outline-none
            transition text-white
          "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="رقم الجوال"
          className="
            w-full p-4 rounded-xl 
            bg-[#121212] border border-red-900/40
            focus:border-red-600 outline-none
            transition text-white
          "
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="العنوان بالتفصيل"
          className="
            w-full p-4 rounded-xl 
            bg-[#121212] border border-red-900/40
            focus:border-red-600 outline-none
            transition text-white h-32
          "
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <button
          onClick={handleNext}
          className="
            w-full py-4 rounded-full
            bg-red-600 hover:bg-red-700 transition 
            text-white font-extrabold text-xl 
            hover:scale-105 active:scale-95
          "
        >
          متابعة الدفع
        </button>
      </div>
    </motion.div>
  );
}
