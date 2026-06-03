import { Outlet } from "react-router-dom";
import Header from "@/presentation/shared/organisms/Header";
import Sidebar from "@/presentation/shared/organisms/Sidebar";
import { useState } from "react";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100">
      <Header onToggleSidebar={() => { setSidebarOpen((prev) => !prev); }} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => { setSidebarOpen(false); }} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
