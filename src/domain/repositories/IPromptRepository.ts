import type { Prompt } from "@/domain/entities/Prompt";
import type { PromptId } from "@/domain/types";

export interface IPromptRepository {
  getById(id: PromptId): Prompt | undefined;
  getAll(): readonly Prompt[];
  save(prompt: Prompt): void;
  delete(id: PromptId): void;
}
