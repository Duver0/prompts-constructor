import type { Prompt } from "@/domain/entities/Prompt";
import { updatePrompt } from "@/domain/entities/Prompt";
import type { Block } from "@/domain/entities/Block";
import type { Variable } from "@/domain/entities/SharedTypes";
import type { Tag } from "@/domain/value-objects/Tag";
import type { IPromptRepository } from "@/domain/repositories";
import { createTimestamp } from "@/domain/value-objects";
import type { PromptId } from "@/domain/types";

export type EditPromptInput = {
  promptId: string;
  title?: string;
  blocks?: readonly Block[];
  variables?: readonly Variable[];
  tags?: readonly Tag[];
};

export type EditPromptOutput = {
  prompt: Prompt;
};

export class EditPromptUseCase {
  constructor(private readonly promptRepo: IPromptRepository) {}

  execute(input: EditPromptInput): EditPromptOutput {
    const existing = this.promptRepo.getById(input.promptId as PromptId);
    if (!existing) {
      throw new Error(`Prompt not found: ${input.promptId}`);
    }

    const now = createTimestamp();
    const updated = updatePrompt(existing, {
      title: input.title,
      blocks: input.blocks,
      variables: input.variables,
      tags: input.tags,
    });

    // Update the timestamp on the updated prompt
    const promptWithTimestamp = { ...updated, updatedAt: now } as const;

    this.promptRepo.save(promptWithTimestamp);
    return { prompt: promptWithTimestamp };
  }
}
