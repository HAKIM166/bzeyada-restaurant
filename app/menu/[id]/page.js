/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [addons, setAddons] = useState({ free: [], paid: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchAddons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/menu/${id}`);
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      setProduct(data.data);
    } catch (err) {
      setError("فشل تحميل بيانات المنتج");
    } finally {
      setLoading(false);
    }
  };

  const fetchAddons = async () => {
    try {
      const res = await fetch("/api/addons");
      const data = await res.json();
      setAddons(data.data);
    } catch {}
  };

  if (loading)
    return (
      <div className="text-center text-white text-xl pt-32">
        جاري تحميل المنتج…
      </div>
    );

  if (error || !product)
    return (
      <div className="text-center text-red-500 text-xl pt-32">{error}</div>
    );

  const getFreeAddonName = (id) => {
    const match = addons.free.find((a) => a.id === id);
    return match?.name || "";
  };

  const getPaidAddon = (id) => {
    return addons.paid.find((a) => a.id === id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        min-h-screen text-white px-6 py-24 relative
        bg-[url('/assets/wood1.jpg')]
        bg-cover bg-center bg-fixed
      "
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-3xl mx-auto bg-[#171717]/90 p-6 rounded-2xl border border-red-900/30 shadow-xl">

        <img
          src={product.img}
          alt={product.name}
          className="w-full h-72 object-cover rounded-xl mb-5"
        />

        <h1 className="text-4xl font-extrabold text-red-500 mb-2">
          {product.name}
        </h1>

        <p className="text-gray-300 mb-4">{product.desc}</p>

        <p className="text-3xl font-bold text-white mb-6">
          {product.price} ريال
        </p>

        <div className="bg-[#111]/60 p-4 rounded-xl mb-6 border border-white/5">
          <h2 className="text-xl font-bold text-red-500 mb-3">
            الإضافات المجانية:
          </h2>

          {product.freeAddons?.map((id) => (
            <p key={id} className="text-green-400 text-sm">
              • {getFreeAddonName(id)}
            </p>
          ))}

          <h2 className="text-xl font-bold text-red-500 mt-4 mb-3">
            الإضافات المدفوعة:
          </h2>

          {product.paidAddons?.map((id) => {
            const addon = getPaidAddon(id);
            return (
              <p key={id} className="text-red-400 text-sm">
                • {addon?.name} — {addon?.price} ريال
              </p>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <AddToCartButton item={product} big />
        </div>
      </div>
    </motion.div>
  );
}
