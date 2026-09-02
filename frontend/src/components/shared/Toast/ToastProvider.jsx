"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

const ToastContext = createContext(null);

const toastStyles = {
  error: {
    icon: AlertCircle,
    backgroundClass: "bg-red-600",
    label: "Error",
  },
  success: {
    icon: CheckCircle2,
    backgroundClass: "bg-emerald-600",
    label: "Success",
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, message, type }]);

      window.setTimeout(() => dismissToast(id), 4500);
      return id;
    },
    [dismissToast],
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div
        aria-label="Notifications"
        className="fixed right-4 top-4 z-[100] flex w-[min( calc(100vw-2rem), 380px)] flex-col gap-3 sm:right-6 sm:top-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const style = toastStyles[toast.type] || toastStyles.success;
            const Icon = style.icon;

            return (
              <motion.div
                key={toast.id}
                role={toast.type === "error" ? "alert" : "status"}
                initial={{ opacity: 0, x: 24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start gap-3 overflow-hidden rounded-xl px-4 py-3.5 pr-10 font-serif text-white shadow-[0_14px_40px_rgba(17,17,17,0.2)] ${style.backgroundClass}`}
              >
                <span className="mt-0.5 shrink-0 text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/75">
                    {style.label}
                  </p>
                  <p className="mt-0.5 text-sm leading-5 text-white">
                    {toast.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="absolute right-3 top-3 cursor-pointer rounded-md p-1 text-white/75 transition-colors hover:bg-white/15 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left animate-[toast-progress_4.5s_linear_forwards] bg-white/70" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
