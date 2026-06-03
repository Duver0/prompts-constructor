import { useEffect, useRef, type ReactNode } from "react";
import { createFadeInAnimation } from "@/infrastructure/animation";

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
  animated?: boolean;
};

const paddingStyles = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export function Card({
  children,
  className = "",
  onClick,
  padding = "md",
  hover = false,
  animated = true,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const animation = createFadeInAnimation(cardRef.current);
    return () => { animation.cancel(); };
  }, [animated]);

  const sharedClasses = `rounded-xl border border-surface-200 bg-white text-left dark:border-surface-700 dark:bg-surface-900 ${paddingStyles[padding]} ${hover ? "transition-shadow hover:shadow-md" : ""} ${className}`;

  return (
    <div
      ref={cardRef}
      className={sharedClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
    >
      {children}
    </div>
  );
}
