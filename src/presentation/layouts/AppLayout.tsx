import { Outlet } from "react-router-dom";
import Header from "@/presentation/shared/organisms/Header";

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100">
      <Header />
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
