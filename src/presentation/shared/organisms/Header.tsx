import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/library", label: "Library" },
  { to: "/templates", label: "Templates" },
  { to: "/settings", label: "Settings" },
];

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/library") return location.pathname.startsWith("/library");
    return location.pathname.startsWith(path);
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-surface-200 bg-white px-6 dark:border-surface-700 dark:bg-surface-900">
      <div className="flex items-center gap-8">
        <Link to="/library" className="text-lg font-bold text-primary-600">
          Prompt Architect
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-800 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
