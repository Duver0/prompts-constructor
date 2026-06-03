export default function PromptLibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Prompt Library</h1>
        <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors">
          + New Prompt
        </button>
      </div>
      <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-surface-300 p-12 text-surface-400 dark:border-surface-600">
        <p>No prompts yet. Create your first prompt to get started.</p>
      </div>
    </div>
  );
}
