import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClickOutside } from "@/presentation/hooks/useClickOutside";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/library", label: "Prompt Library", icon: "📋" },
  { to: "/templates", label: "Templates", icon: "📄" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const sidebarRef = useRef<HTMLElement>(null);

  useClickOutside(sidebarRef, onClose, isOpen);

  return (
    <aside
      ref={sidebarRef}
      className={`border-r border-surface-200 bg-white transition-all duration-200 dark:border-surface-700 dark:bg-surface-900 ${
        isOpen ? "w-60" : "w-0 overflow-hidden"
      }`}
      aria-label="Sidebar navigation"
    >
      <div className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                  : "text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
