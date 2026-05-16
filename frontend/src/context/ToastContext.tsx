import { createContext } from "react";

export type ToastType = "success" | "error";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

export type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
