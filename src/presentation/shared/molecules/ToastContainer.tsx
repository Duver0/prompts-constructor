import { useEffect } from "react";
import { useUIStore, type Toast as ToastType } from "@/presentation/stores/useUIStore";

type ToastIcon = Record<ToastType["type"], string>;

const icons: ToastIcon = {
  success: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  error: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  info: "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
  warning: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
};

const bgColors: Record<ToastType["type"], string> = {
  success: "border-l-green-500 bg-green-50 dark:bg-green-900/20",
  error: "border-l-error bg-red-50 dark:bg-red-900/20",
  info: "border-l-info bg-blue-50 dark:bg-blue-900/20",
  warning: "border-l-warning bg-amber-50 dark:bg-amber-900/20",
};

const textColors: Record<ToastType["type"], string> = {
  success: "text-green-800 dark:text-green-300",
  error: "text-red-800 dark:text-red-300",
  info: "text-blue-800 dark:text-blue-300",
  warning: "text-amber-800 dark:text-amber-300",
};

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);
  const dismissToast = useUIStore((s) => s.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => { dismissToast(toast.id); }}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastType;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const duration = toast.duration ?? 4000;
    if (duration <= 0) return;
    const timer = setTimeout(onDismiss, duration);
    return () => { clearTimeout(timer); };
  }, [toast.duration, onDismiss]);

  return (
    <div
      className={`animate-slide-up rounded-lg border-l-4 bg-white p-4 shadow-lg dark:bg-surface-800 ${bgColors[toast.type]}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <svg
          className={`size-5 shrink-0 ${textColors[toast.type]}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={icons[toast.type]} />
        </svg>
        <p className={`text-sm ${textColors[toast.type]}`}>{toast.message}</p>
        <button
          onClick={onDismiss}
          className="ml-auto shrink-0 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
          aria-label="Dismiss notification"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
