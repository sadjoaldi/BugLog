import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
  isLoading,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, type: "spring", bounce: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>

              {/* Content */}
              <h2 className="text-base font-semibold text-white text-center mb-2">{title}</h2>
              <p className="text-sm text-white/50 text-center mb-6">{description}</p>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1 border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                >
                  {cancelLabel}
                </Button>
                <Button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white"
                >
                  {isLoading ? "Suppression..." : confirmLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
