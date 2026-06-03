import { useEffect, useState } from "react";
import { useTemplateStore } from "@/presentation/stores/useTemplateStore";
import { useUIStore } from "@/presentation/stores/useUIStore";
import { Button } from "@/presentation/shared/atoms/Button";
import { Input } from "@/presentation/shared/atoms/Input";
import { Badge } from "@/presentation/shared/atoms/Badge";
import { Card } from "@/presentation/shared/molecules/Card";
import { EmptyState } from "@/presentation/shared/molecules/EmptyState";
import { Modal } from "@/presentation/shared/atoms/Modal";
import type { TemplateCategory } from "@/domain/types";
import { TemplateCategory as TemplateCategoryEnum } from "@/domain/types";

const CATEGORY_LABELS: Record<string, string> = {
  [TemplateCategoryEnum.Coding]: "Coding",
  [TemplateCategoryEnum.Architecture]: "Architecture",
  [TemplateCategoryEnum.ContentCreation]: "Content Creation",
  [TemplateCategoryEnum.Marketing]: "Marketing",
  [TemplateCategoryEnum.Analysis]: "Analysis",
  [TemplateCategoryEnum.Research]: "Research",
  [TemplateCategoryEnum.ProductDesign]: "Product Design",
  [TemplateCategoryEnum.Custom]: "Custom",
};

const CATEGORY_COLORS: Record<string, string> = {
  [TemplateCategoryEnum.Coding]: "info",
  [TemplateCategoryEnum.Architecture]: "info",
  [TemplateCategoryEnum.ContentCreation]: "warning",
  [TemplateCategoryEnum.Marketing]: "warning",
  [TemplateCategoryEnum.Analysis]: "success",
  [TemplateCategoryEnum.Research]: "success",
  [TemplateCategoryEnum.ProductDesign]: "default",
  [TemplateCategoryEnum.Custom]: "default",
};

// Helper to get variant type
function badgeVariant(cat: string): "default" | "success" | "warning" | "error" | "info" {
  const c = CATEGORY_COLORS[cat];
  if (c === "info" || c === "success" || c === "warning") return c;
  return "default";
}

const categoryArray = Object.values(TemplateCategoryEnum) as TemplateCategory[];

export default function TemplatesPage() {
  const {
    filterCategory,
    loadTemplates,
    createTemplateAction,
    setFilterCategory,
    getFilteredTemplates,
  } = useTemplateStore();
  const addToast = useUIStore((s) => s.addToast);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCat, setNewCat] = useState<TemplateCategory>(TemplateCategoryEnum.Coding);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const handleCreate = () => {
    if (!newName.trim()) return;
    createTemplateAction({ name: newName.trim(), description: newDesc.trim(), category: newCat });
    setNewName("");
    setNewDesc("");
    setShowCreateModal(false);
    addToast({ message: `Template "${newName.trim()}" created`, type: "success" });
  };

  const filtered = getFilteredTemplates();

  return (
    <div className="container-main py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
          Templates
        </h1>
        <Button onClick={() => { setShowCreateModal(true); }}>New Template</Button>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => { setFilterCategory("all"); }}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            filterCategory === "all"
              ? "bg-primary-600 text-white"
              : "bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400"
          }`}
        >
          All
        </button>
        {categoryArray.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilterCategory(cat); }}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              filterCategory === cat
                ? "bg-primary-600 text-white"
                : "bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400"
            }`}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={filterCategory !== "all" ? "No templates in this category" : "No templates yet"}
          description={filterCategory !== "all" ? "Try a different category" : "Create your first template to get started"}
          action={filterCategory === "all" ? <Button onClick={() => { setShowCreateModal(true); }}>Create Template</Button> : undefined}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((template) => (
            <Card key={template.id} hover className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                  {template.name}
                </h3>
                <Badge variant={badgeVariant(template.category)}>
                  {CATEGORY_LABELS[template.category] ?? template.category}
                </Badge>
              </div>
              {template.description && (
                <p className="text-sm text-surface-500 line-clamp-2">{template.description}</p>
              )}
              <p className="text-xs text-surface-400">
                {template.blocks.length} block{template.blocks.length !== 1 ? "s" : ""}
              </p>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showCreateModal}
        onClose={() => { setShowCreateModal(false); }}
        title="New Template"
        footer={
          <>
            <Button variant="ghost" onClick={() => { setShowCreateModal(false); }}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Template Name"
            value={newName}
            onChange={(e) => { setNewName(e.target.value); }}
            placeholder="e.g., Code Review Template"
            autoFocus
          />
          <Input
            label="Description"
            value={newDesc}
            onChange={(e) => { setNewDesc(e.target.value); }}
            placeholder="Brief description of this template"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
              Category
            </label>
            <select
              value={newCat}
              onChange={(e) => { setNewCat(e.target.value as TemplateCategory); }}
              className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
            >
              {categoryArray.map((cat) => (
                <option key={cat} value={cat}>{CATEGORY_LABELS[cat] ?? cat}</option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
