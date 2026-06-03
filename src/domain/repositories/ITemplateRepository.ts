import type { PromptTemplate } from "@/domain/entities/PromptTemplate";
import type { TemplateId, TemplateCategory } from "@/domain/types";

export interface ITemplateRepository {
  getById(id: TemplateId): PromptTemplate | undefined;
  getAll(): readonly PromptTemplate[];
  getByCategory(category: TemplateCategory): readonly PromptTemplate[];
  save(template: PromptTemplate): void;
  delete(id: TemplateId): void;
}
