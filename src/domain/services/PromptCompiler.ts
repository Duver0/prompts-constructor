import type { Prompt } from "@/domain/entities/Prompt";
import { getBlockContentText } from "@/domain/value-objects/BlockContent";

export type CompiledPrompt = Readonly<{
  content: string;
  blockCount: number;
  enabledBlockCount: number;
  totalCharacters: number;
}>;

/**
 * Compiles a prompt by concatenating all enabled blocks' content
 * into a single unified prompt string.
 */
export function compilePrompt(prompt: Prompt): CompiledPrompt {
  const enabledBlocks = prompt.blocks.filter((b) => b.enabled);
  const sortedBlocks = [...enabledBlocks].sort((a, b) => a.order - b.order);

  let content = "";

  for (const block of sortedBlocks) {
    const blockContent = getBlockContentText(block.content);
    if (blockContent.trim()) {
      content += blockContent.trim() + "\n\n";
    }
  }

  const trimmed = content.trim();

  return {
    content: trimmed,
    blockCount: prompt.blocks.length,
    enabledBlockCount: enabledBlocks.length,
    totalCharacters: trimmed.length,
  } as const;
}

/**
 * Compiles a prompt with section headers for each block.
 */
export function compilePromptWithHeaders(prompt: Prompt): CompiledPrompt {
  const enabledBlocks = prompt.blocks.filter((b) => b.enabled);
  const sortedBlocks = [...enabledBlocks].sort((a, b) => a.order - b.order);

  let content = "";

  for (const block of sortedBlocks) {
    const blockContent = getBlockContentText(block.content);
    if (blockContent.trim()) {
      content += `## ${block.title}\n${blockContent.trim()}\n\n`;
    }
  }

  const trimmed = content.trim();

  return {
    content: trimmed,
    blockCount: prompt.blocks.length,
    enabledBlockCount: enabledBlocks.length,
    totalCharacters: trimmed.length,
  } as const;
}
