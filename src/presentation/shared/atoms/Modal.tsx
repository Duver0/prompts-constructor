import { useEffect, useRef, type ReactNode, useCallback } from "react";
import { Button } from "@/presentation/shared/atoms/Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
};

/**
 * Focus trap: cycles focus between the first and last focusable elements.
 */
function useFocusTrap(containerRef: React.RefObject<HTMLDivElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    // Focus the first focusable element on open
    requestAnimationFrame(() => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0]?.focus();
      }
    });

    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("keydown", handleKeyDown); };
  }, [active, containerRef]);
}

const sizeClasses: Record<string, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({ open, onClose, title, children, footer, size = "md" }: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(panelRef, open);

    const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); }
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className={`relative z-10 mx-4 w-full ${String(sizeClasses[size] ?? sizeClasses.md)} animate-slide-up rounded-xl bg-white p-6 shadow-xl dark:bg-surface-900`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </Button>
        </div>
        <div className="text-sm text-surface-600 dark:text-surface-400">
          {children}
        </div>
        {footer && (
          <div className="mt-6 flex justify-end gap-3 border-t border-surface-200 pt-4 dark:border-surface-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
