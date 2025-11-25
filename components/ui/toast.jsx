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

      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
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
