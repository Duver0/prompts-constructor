import { Link } from "react-router-dom";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-surface-200 bg-white px-4 dark:border-surface-700 dark:bg-surface-900">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
          aria-label="Toggle sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/library" className="text-lg font-bold text-primary-600">
          Prompt Architect
        </Link>
      </div>
      <nav className="flex items-center gap-2">
        <Link
          to="/library"
          className="rounded-md px-3 py-1.5 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
        >
          Library
        </Link>
        <Link
          to="/templates"
          className="rounded-md px-3 py-1.5 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
        >
          Templates
        </Link>
        <Link
          to="/settings"
          className="rounded-md px-3 py-1.5 text-sm text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
