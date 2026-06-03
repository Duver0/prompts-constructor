import { useParams } from "react-router-dom";

export default function PromptEditorPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
        Edit Prompt
      </h1>
      <p className="text-surface-500">Editing prompt: {id}</p>
      <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-surface-300 p-12 text-surface-400 dark:border-surface-600">
        <p>Prompt editor will be implemented here.</p>
      </div>
    </div>
  );
}
