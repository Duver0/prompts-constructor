import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePromptStore } from "@/presentation/stores/usePromptStore";
import { useEditorStore } from "@/presentation/stores/useEditorStore";
import { useUIStore } from "@/presentation/stores/useUIStore";
import { Button } from "@/presentation/shared/atoms/Button";
import { Input } from "@/presentation/shared/atoms/Input";
import { Badge } from "@/presentation/shared/atoms/Badge";
import { EmptyState } from "@/presentation/shared/molecules/EmptyState";
import type { PromptId, BlockType } from "@/domain/types";
import { BlockType as BlockTypeEnum } from "@/domain/types";
import { createBlockContent } from "@/domain/value-objects/BlockContent";
import { createBlock } from "@/domain/entities/Block";
import { createBlockId, createTimestamp } from "@/domain/value-objects";

const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  [BlockTypeEnum.Role]: "Role",
  [BlockTypeEnum.Context]: "Context",
  [BlockTypeEnum.Objective]: "Objective",
  [BlockTypeEnum.Constraints]: "Constraints",
  [BlockTypeEnum.Examples]: "Examples",
  [BlockTypeEnum.OutputFormat]: "Output Format",
  [BlockTypeEnum.Variables]: "Variables",
  [BlockTypeEnum.Notes]: "Notes",
};

const BLOCK_TYPE_COLORS: Record<BlockType, string> = {
  [BlockTypeEnum.Role]: "border-l-blue-500",
  [BlockTypeEnum.Context]: "border-l-green-500",
  [BlockTypeEnum.Objective]: "border-l-purple-500",
  [BlockTypeEnum.Constraints]: "border-l-amber-500",
  [BlockTypeEnum.Examples]: "border-l-teal-500",
  [BlockTypeEnum.OutputFormat]: "border-l-pink-500",
  [BlockTypeEnum.Variables]: "border-l-cyan-500",
  [BlockTypeEnum.Notes]: "border-l-surface-400",
};

export default function PromptEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const promptId = id as PromptId | undefined;

  const { getPromptById, updatePromptAction } = usePromptStore();
  const { activeBlockId, setActiveBlock, dirty, setDirty } = useEditorStore();
  const addToast = useUIStore((s) => s.addToast);
  const prompt = promptId ? getPromptById(promptId) : undefined;

  const [title, setTitle] = useState(prompt?.title ?? "");

  // Compute initial block texts — only set once on mount
  const [blockTexts, setBlockTexts] = useState<Record<string, string>>(() => {
    if (!prompt) return {};
    const texts: Record<string, string> = {};
    for (const block of prompt.blocks) {
      const content = block.content;
      const data = "data" in content ? (content as { data: { text?: string } }).data : null;
      texts[block.id] = data?.text ?? "";
    }
    return texts;
  });

  const handleSave = useCallback(() => {
    if (!prompt || !promptId) return;

    const now = createTimestamp();
    const updatedBlocks = prompt.blocks.map((block) => {
      const text = blockTexts[block.id] ?? "";
      const blockType = block.type;
      const newBlock = createBlock({
        id: block.id,
        type: blockType,
        title: block.title,
        content: createBlockContent(blockType, { text }),
        order: block.order,
        createdAt: now,
        updatedAt: now,
      });
      return newBlock;
    });

    updatePromptAction(promptId, { title, blocks: updatedBlocks });
    setDirty(false);
    addToast({ message: "Prompt saved", type: "success" });
  }, [prompt, promptId, title, blockTexts, updatePromptAction, setDirty, addToast]);

  const handleAddBlock = useCallback(
    (type: BlockType) => {
      if (!prompt || !promptId) return;
      const now = createTimestamp();
      const newBlock = createBlock({
        id: createBlockId(),
        type,
        title: BLOCK_TYPE_LABELS[type],
        content: createBlockContent(type, { text: "" }),
        order: prompt.blocks.length + 1,
        createdAt: now,
        updatedAt: now,
      });
      updatePromptAction(promptId, { blocks: [...prompt.blocks, newBlock] });
      setDirty(true);
    },
    [prompt, promptId, updatePromptAction, setDirty],
  );

  const handleBlockTextChange = useCallback(
    (blockId: string, text: string) => {
      setBlockTexts((prev) => ({ ...prev, [blockId]: text }));
      setDirty(true);
    },
    [setDirty],
  );

  const handleRemoveBlock = useCallback(
    (blockId: string) => {
      if (!prompt || !promptId) return;
      updatePromptAction(promptId, {
        blocks: prompt.blocks.filter((b) => b.id !== blockId),
      });
      setDirty(true);
    },
    [prompt, promptId, updatePromptAction, setDirty],
  );

  if (!prompt) {
    return (
      <div className="container-main py-6">
        <EmptyState
          icon={
            <svg className="size-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          }
          title="Prompt not found"
          description="The prompt you're looking for doesn't exist or has been deleted."
          action={<Button onClick={() => { void navigate("/library"); }}>Back to Library</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container-main py-6">
      {/* Editor Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => { void navigate("/library"); }}>
            <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
          </Button>
          <Input
            value={title}
            onChange={(e) => { setTitle(e.target.value); setDirty(true); }}
            className="text-lg font-bold border-0 bg-transparent px-0 py-0 focus:ring-0"
            aria-label="Prompt title"
          />
          <Badge>{prompt.status}</Badge>
          <span className="text-xs text-surface-400">v{prompt.version.value}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => { void navigate(`/versions/${String(promptId ?? "")}`); }}>
            Versions
          </Button>
          <Button variant="secondary" onClick={() => { void navigate(`/export/${String(promptId ?? "")}`); }}>
            Export
          </Button>
          <Button onClick={handleSave} disabled={!dirty}>
            {dirty ? "Save" : "Saved"}
          </Button>
        </div>
      </div>

      {/* Blocks */}
      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          {prompt.blocks.length === 0 ? (
            <EmptyState
              title="No blocks yet"
              description="Add blocks to build your prompt structure"
            />
          ) : (
            prompt.blocks.map((block) => {
              const blockType = block.type;
              return (
                <div
                  key={block.id}
                  className={`rounded-lg border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900 border-l-4 ${BLOCK_TYPE_COLORS[blockType]} ${activeBlockId === block.id ? "ring-2 ring-primary-500" : ""}`}
                  onClick={() => { setActiveBlock(block.id); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter") setActiveBlock(block.id); }}
                  aria-label={`${BLOCK_TYPE_LABELS[blockType]} block`}
                >
                  <div className="flex items-center justify-between border-b border-surface-100 px-4 py-2 dark:border-surface-700">
                    <span className="text-xs font-semibold uppercase tracking-wider text-surface-500">
                      {BLOCK_TYPE_LABELS[blockType]}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveBlock(block.id);
                      }}
                      className="text-surface-400 hover:text-error transition-colors"
                      aria-label={`Remove ${BLOCK_TYPE_LABELS[blockType]} block`}
                    >
                      <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <textarea
                      value={blockTexts[block.id] ?? ""}
                      onChange={(e) => { handleBlockTextChange(block.id, e.target.value); }}
                      className="min-h-[100px] w-full resize-y border-0 bg-transparent p-0 text-sm text-surface-900 placeholder-surface-400 focus:outline-none dark:text-surface-100 dark:placeholder-surface-500"
                      placeholder={`Enter ${BLOCK_TYPE_LABELS[blockType].toLowerCase()} content...`}
                      aria-label={`${BLOCK_TYPE_LABELS[blockType]} content`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar - Add Block */}
        <div className="w-56 shrink-0">
          <div className="sticky top-6 rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-900">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-surface-500">
              Add Block
            </h3>
            <div className="flex flex-col gap-1.5">
              {Object.values(BlockTypeEnum).map((type) => (
                <button
                  key={type}
                  onClick={() => { handleAddBlock(type); }}
                  className="rounded-md px-3 py-2 text-left text-sm text-surface-700 transition-colors hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
                >
                  + {BLOCK_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
