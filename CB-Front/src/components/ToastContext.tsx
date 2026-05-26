import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
  visible : boolean;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function removeToast(id: number) {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  }

  function showToast(message: string, type: ToastType = "info") {
    const id = Date.now();

    const newToast: Toast = {
      id,
      message,
      type,
      visible: false
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, visible: true } : toast
        )
      );
    }, 10);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }

  function getToastStyle(type: ToastType) {
    if (type === "success") {
      return "bg-[#09da72] text-black";
    }

    if (type === "error") {
      return "bg-red-500 text-white";
    }

    return "bg-blue-800 text-white";
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed left-1/2 top-5 z-9999 flex w-full max-w-md -translate-x-1/2 flex-col gap-3 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center justify-between gap-4 rounded-2xl px-5 py-3
              text-sm font-semibold shadow-lg
              transition-all duration-300 ease-out
              ${getToastStyle(toast.type)}
              ${
                toast.visible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "-translate-y-5 opacity-0 scale-95"
              }
            `}
          >
            <span>{toast.message}</span>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-lg leading-none opacity-70 transition hover:opacity-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast должен использоваться внутри ToastProvider");
  }

  return context;
}