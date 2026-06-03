import type { Prompt } from "@/domain/entities/Prompt";
import { createPrompt, updatePrompt } from "@/domain/entities/Prompt";
import { createBlock } from "@/domain/entities/Block";
import { createBlockContent } from "@/domain/value-objects/BlockContent";
import {
  createPromptId,
  createBlockId,
  createVersionNumber,
  createTimestamp,
} from "@/domain/value-objects";
import type { IPromptRepository, ITemplateRepository } from "@/domain/repositories";
import { TemplateCategory, BlockType } from "@/domain/types";
import type { TemplateId } from "@/domain/types";
import { getRequiredBlocksForCategory } from "@/domain/rules/templateRules";

export type CreatePromptInput = {
  title: string;
  fromTemplateId?: string;
  category?: TemplateCategory;
};

export type CreatePromptOutput = {
  prompt: Prompt;
};

export class CreatePromptUseCase {
  constructor(
    private readonly promptRepo: IPromptRepository,
    private readonly templateRepo?: ITemplateRepository,
  ) {}

  execute(input: CreatePromptInput): CreatePromptOutput {
    const now = createTimestamp();
    const promptId = createPromptId();

    // Ensure proper typing for IDs
    const templateId = input.fromTemplateId as TemplateId | undefined;

    const prompt = createPrompt({
      id: promptId,
      title: input.title,
      version: createVersionNumber(1),
      createdAt: now,
      updatedAt: now,
    });

    // If creating from template, copy blocks
    if (templateId && this.templateRepo) {
      const template = this.templateRepo.getById(templateId);
      if (template) {
        const blocks = template.blocks
          .filter((b) => b.enabled)
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

        const updatedPrompt = updatePrompt(prompt, {
          blocks,
          variables: [...template.variables],
        });

        this.promptRepo.save(updatedPrompt);
        return { prompt: updatedPrompt };
      }
    }

    // Otherwise create with default blocks for category
    if (input.category) {
      const requiredTypes = getRequiredBlocksForCategory(input.category);
      const blocks = requiredTypes.map((type, index) =>
        createBlock({
          id: createBlockId(),
          type,
          title: type,
          content: createBlockContent(type, { text: "" }),
          order: index + 1,
          createdAt: now,
          updatedAt: now,
        })
      );
      const updatedPrompt = updatePrompt(prompt, { blocks });
      this.promptRepo.save(updatedPrompt);
      return { prompt: updatedPrompt };
    }

    this.promptRepo.save(prompt);
    return { prompt };
  }
}
