import type { PromptTemplate } from "@/domain/entities/PromptTemplate";
import type { Prompt } from "@/domain/entities/Prompt";
import { createPrompt } from "@/domain/entities/Prompt";
import { createBlock } from "@/domain/entities/Block";
import { createBlockContent } from "@/domain/value-objects/BlockContent";
import { createPromptId, createBlockId, createVersionNumber, createTimestamp } from "@/domain/value-objects";
import { BlockType } from "@/domain/types";

/**
 * Creates a new Prompt from a PromptTemplate, copying
 * the template's block structure and variables.
 */
export function instantiateTemplate(template: PromptTemplate): Prompt {
  const now = createTimestamp();
  const promptId = createPromptId();

  const blocks = template.blocks
    .filter((bt) => bt.enabled)
    .sort((a, b) => a.order - b.order)
    .map((bt) => {
      const blockType = bt.type as BlockType;
      return createBlock({
        id: createBlockId(),
        type: blockType,
        title: bt.title ?? blockType,
        content: createBlockContent(blockType, bt.content as never),
        order: bt.order,
        createdAt: now,
        updatedAt: now,
      });
    });

  const prompt = createPrompt({
    id: promptId,
    title: `New ${template.name}`,
    version: createVersionNumber(1),
    createdAt: now,
    updatedAt: now,
    templateId: template.id,
  });

  return {
    ...prompt,
    blocks,
    variables: [...template.variables],
  } as const;
}
