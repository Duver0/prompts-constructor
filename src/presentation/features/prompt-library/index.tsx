import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePromptStore } from "@/presentation/stores/usePromptStore";
import { useUIStore } from "@/presentation/stores/useUIStore";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import { Button } from "@/presentation/shared/atoms/Button";
import { Input } from "@/presentation/shared/atoms/Input";
import { Badge } from "@/presentation/shared/atoms/Badge";
import { Card } from "@/presentation/shared/molecules/Card";
import { EmptyState } from "@/presentation/shared/molecules/EmptyState";
import { Modal } from "@/presentation/shared/atoms/Modal";

export default function PromptLibraryPage() {
  const navigate = useNavigate();
  const {
    loading,
    searchQuery,
    loadPrompts,
    createPromptAction,
    deletePrompt,
    setSearchQuery,
    getFilteredPrompts,
  } = usePromptStore();
  const addToast = useUIStore((s) => s.addToast);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 250);

  // Sync debounced search to store
  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  useEffect(() => {
    loadPrompts();
  }, [loadPrompts]);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const prompt = createPromptAction(newTitle.trim());
    setNewTitle("");
    setShowCreateModal(false);
    addToast({ message: `Prompt "${newTitle.trim()}" created`, type: "success" });
    void navigate(`/library/${String(prompt.id)}`);
  };

  const filteredPrompts = getFilteredPrompts();

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case "Draft": return "default" as const;
      case "Published": return "success" as const;
      case "Archived": return "warning" as const;
      default: return "default" as const;
    }
  };

  return (
    <div className="container-main py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Prompt Library
          </h1>
          <p className="mt-1 text-sm text-surface-500">
            {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => { setShowCreateModal(true); }}>
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          New Prompt
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md">
        <Input
          placeholder="Search prompts..."
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value); }}
          aria-label="Search prompts"
        />
      </div>

      {/* Prompt List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
        </div>
      ) : filteredPrompts.length === 0 ? (
        <EmptyState
          icon={
            <svg className="size-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
          title={searchQuery ? "No prompts match your search" : "No prompts yet"}
          description={
            searchQuery
              ? "Try a different search term"
              : "Create your first prompt to get started"
          }
          action={
            !searchQuery ? (
              <Button onClick={() => { setShowCreateModal(true); }}>
                Create Prompt
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <Card
              key={prompt.id}
              hover
              onClick={() => { void navigate(`/library/${String(prompt.id)}`); }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 line-clamp-2">
                  {prompt.title}
                </h3>
                <Badge variant={statusBadgeVariant(prompt.status)}>
                  {prompt.status}
                </Badge>
              </div>
              <p className="text-xs text-surface-500">
                {prompt.blocks.length} block{prompt.blocks.length !== 1 ? "s" : ""} · v{prompt.version.value}
              </p>
              <div className="flex items-center justify-between text-xs text-surface-400">
                <span>
                  {new Date(prompt.updatedAt.value).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePrompt(prompt.id);
                    addToast({ message: "Prompt deleted", type: "info" });
                  }}
                  className="text-surface-400 hover:text-error transition-colors"
                  aria-label={`Delete ${prompt.title}`}
                >
                  <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        open={showCreateModal}
        onClose={() => { setShowCreateModal(false); setNewTitle(""); }}
        title="New Prompt"
        footer={
          <>
            <Button variant="ghost" onClick={() => { setShowCreateModal(false); setNewTitle(""); }}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!newTitle.trim()}>
              Create
            </Button>
          </>
        }
      >
        <Input
          label="Prompt Title"
          placeholder="e.g., Code Review Assistant"
          value={newTitle}
          onChange={(e) => { setNewTitle(e.target.value); }}
          onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
          autoFocus
        />
      </Modal>
    </div>
  );
}
