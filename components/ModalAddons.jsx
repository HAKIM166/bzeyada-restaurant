"use client";

import { useState, useEffect } from "react";
import { addons } from "@/lib/addonsData";
import { useCart } from "@/context/CartContext";

export default function AddonsModal({ item, close }) {
  const { updateItemAddons } = useCart();

  const [selectedFree, setSelectedFree] = useState([]);
  const [selectedPaid, setSelectedPaid] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!item) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedFree(item.freeAddons || []);
    setSelectedPaid(item.paidAddons || []);
    setNote(item.note || "");
  }, [item]);

  // ---------------- FREE ADDONS (toggle)
  const toggleFree = (addonId) => {
    setSelectedFree((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // ---------------- PAID ADDONS (qty)
  const updatePaidQty = (addon, qty) => {
    setSelectedPaid((prev) => {
      if (qty === 0) return prev.filter((a) => a.id !== addon.id);

      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.map((a) =>
          a.id === addon.id ? { ...a, qty } : a
        );
      }

      return [...prev, { ...addon, qty }];
    });
  };

  const saveChanges = () => {
    updateItemAddons(item.uniqueId, {
      freeAddons: selectedFree,
      paidAddons: selectedPaid,
      note,
    });
    close();
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={close}
      ></div>

      {/* MODAL */}
      <div
        className="
          fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[90%] max-w-[380px]
          bg-[#181818] text-white rounded-2xl shadow-xl border border-white/10 z-50
          animate-slideUp max-h-[80vh] flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-red-500">تعديل الإضافات</h2>
          <button onClick={close} className="text-gray-300 text-xl hover:text-white">
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-6 overflow-y-auto">
          {addons.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold text-red-400 mb-2 border-r-4 border-red-600 pr-2">
                {group.group}
              </h3>

              {group.type === "free" && (
                <div className="space-y-3">
                  {group.items.map((addon) => (
                    <label
                      key={addon.id}
                      className="
                        flex justify-between items-center bg-[#222] px-4 py-3 rounded-xl
                        border border-white/10 hover:bg-[#2c2c2c] transition cursor-pointer
                      "
                    >
                      <span>{addon.name}</span>
                      <input
                        type="checkbox"
                        checked={selectedFree.includes(addon.id)}
                        onChange={() => toggleFree(addon.id)}
                        className="w-4 h-4 accent-red-600"
                      />
                    </label>
                  ))}
                </div>
              )}

              {group.type === "paid" && (
                <div className="space-y-3">
                  {group.items.map((addon) => {
                    const existing = selectedPaid.find((a) => a.id === addon.id);
                    const qty = existing?.qty || 0;

                    return (
                      <div
                        key={addon.id}
                        className="
                          flex justify-between items-center bg-[#222] px-4 py-3 rounded-xl
                          border border-white/10 hover:bg-[#2c2c2c] transition
                        "
                      >
                        <span>{addon.name}</span>

                        <div className="flex items-center gap-3">
                          <span className="text-red-400 text-sm">
                            {addon.price} ريال
                          </span>

                          <select
                            value={qty}
                            onChange={(e) =>
                              updatePaidQty(addon, Number(e.target.value))
                            }
                            className="
                              bg-[#111] border border-white/10 rounded-lg
                              px-2 py-1 text-sm focus:outline-none
                            "
                          >
                            {Array.from({ length: addon.maxQty + 1 }).map((_, i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <textarea
            className="w-full bg-[#222] p-3 rounded-xl border border-white/10 focus:border-red-600"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="اكتب ملاحظة..."
            rows={3}
          ></textarea>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={saveChanges}
            className="w-full py-3 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition"
          >
            حفظ التعديلات
          </button>
        </div>
      </div>
    </>
  );
}
