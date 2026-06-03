import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
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
}: CardProps) {
  const Component = onClick ? "button" : "div";
  return (
    <Component
      className={`rounded-xl border border-surface-200 bg-white text-left dark:border-surface-700 dark:bg-surface-900 ${paddingStyles[padding]} ${hover ? "transition-shadow hover:shadow-md" : ""} ${className}`}
      onClick={onClick}
      {...(onClick ? { type: "button" as const } : {})}
    >
      {children}
    </Component>
  );
}
