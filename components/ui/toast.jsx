"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg }]);

    setTimeout(() => {
      setToasts((p) => p.filter((t) => t.id !== id));
    }, 2200);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-black text-white px-4 py-3 rounded-lg shadow-lg animate-toast"
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
