import { Card } from "@/presentation/shared/molecules/Card";

export default function SettingsPage() {
  return (
    <div className="container-main py-6">
      <h1 className="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-100">
        Settings
      </h1>

      <div className="max-w-2xl space-y-6">
        <Card padding="lg">
          <h2 className="mb-2 text-lg font-semibold text-surface-900 dark:text-surface-100">
            Theme
          </h2>
          <p className="text-sm text-surface-500">
            Theme preferences are managed by your system settings. Toggle dark mode
            in your operating system preferences to switch automatically.
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="mb-2 text-lg font-semibold text-surface-900 dark:text-surface-100">
            Data
          </h2>
          <p className="text-sm text-surface-500">
            All data is stored locally in your browser using localStorage. Export your
            prompts to back them up or migrate to another device.
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="mb-2 text-lg font-semibold text-surface-900 dark:text-surface-100">
            About
          </h2>
          <p className="text-sm text-surface-500">
            Prompt Architect v1.0.0 — A visual prompt engineering platform.
            Built with React 19, TypeScript 6, Zustand 5, and TailwindCSS 4.
          </p>
        </Card>
      </div>
    </div>
  );
}
