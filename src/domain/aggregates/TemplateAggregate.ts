import type { PromptTemplate } from "@/domain/entities/PromptTemplate";
import type { Variable, BlockTemplate } from "@/domain/entities/SharedTypes";

/**
 * TemplateAggregate enforces consistency for PromptTemplate root
 * and its template blocks and variables.
 */
export type TemplateAggregate = Readonly<{
  root: PromptTemplate;
  blockTemplates: readonly BlockTemplate[];
  variables: readonly Variable[];
}>;

export function createTemplateAggregate(root: PromptTemplate): TemplateAggregate {
  return {
    root,
    blockTemplates: root.blocks,
    variables: root.variables,
  } as const;
}
