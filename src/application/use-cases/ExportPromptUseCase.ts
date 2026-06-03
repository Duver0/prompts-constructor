import type { IPromptRepository } from "@/domain/repositories";
import type { ExportResult } from "@/domain/value-objects/ExportResult";
import { exportPrompt } from "@/domain/services/PromptExporter";
import { ExportFormat } from "@/domain/types";
import type { PromptId } from "@/domain/types";

export type ExportPromptInput = {
  promptId: string;
  format: ExportFormat;
  variableValues?: Record<string, string>;
};

export type ExportPromptOutput = {
  result: ExportResult;
};

export class ExportPromptUseCase {
  constructor(private readonly promptRepo: IPromptRepository) {}

  execute(input: ExportPromptInput): ExportPromptOutput {
    const prompt = this.promptRepo.getById(input.promptId as PromptId);
    if (!prompt) {
      throw new Error(`Prompt not found: ${input.promptId}`);
    }

    const result = exportPrompt(prompt, input.format);
    return { result };
  }
}
