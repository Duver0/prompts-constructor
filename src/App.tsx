import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "@/presentation/layouts/AppLayout";

const PromptLibrary = lazy(() => import("@/presentation/features/prompt-library"));
const PromptEditor = lazy(() => import("@/presentation/features/prompt-editor"));
const VersionHistory = lazy(() => import("@/presentation/features/version-history"));
const ExportCenter = lazy(() => import("@/presentation/features/export-center"));
const Templates = lazy(() => import("@/presentation/features/templates"));
const Settings = lazy(() => import("@/presentation/features/settings"));

function LoadingFallback() {
  return (
    <div className="flex h-full min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        <p className="text-sm text-surface-500">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/library" replace />} />
            <Route path="/library" element={<PromptLibrary />} />
            <Route path="/library/:id" element={<PromptEditor />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/:id" element={<Templates />} />
            <Route path="/versions/:promptId" element={<VersionHistory />} />
            <Route path="/export/:promptId" element={<ExportCenter />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
