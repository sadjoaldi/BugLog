import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, X, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import type { Toast } from "./ToastContext";
import { ToastContext } from "./ToastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95 }}
              transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-xl border min-w-64 max-w-sm ${
                toast.type === "success"
                  ? "bg-gray-900 border-emerald-500/30"
                  : "bg-gray-900 border-red-500/30"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span className="flex-1 text-white/80">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/30 hover:text-white/70 transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
