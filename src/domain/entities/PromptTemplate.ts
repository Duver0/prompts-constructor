import type { TemplateId, TemplateCategory, Timestamp } from "@/domain/types";
import type { Variable, BlockTemplate } from "@/domain/entities/SharedTypes";
import type { VersionNumber } from "@/domain/value-objects/VersionNumber";

export type PromptTemplate = Readonly<{
  id: TemplateId;
  name: string;
  category: TemplateCategory;
  blocks: readonly BlockTemplate[];
  variables: readonly Variable[];
  createdAt: Timestamp;
  version: VersionNumber;
}>;

export type TemplateUpdateParams = Partial<{
  name: string;
  category: TemplateCategory;
  blocks: readonly BlockTemplate[];
  variables: readonly Variable[];
}>;

export function createPromptTemplate(params: {
  id: TemplateId;
  name: string;
  category: TemplateCategory;
  version: VersionNumber;
  createdAt: Timestamp;
}): PromptTemplate {
  return {
    id: params.id,
    name: params.name,
    category: params.category,
    blocks: [],
    variables: [],
    createdAt: params.createdAt,
    version: params.version,
  } as const;
}

export function updateTemplate(
  template: PromptTemplate,
  params: TemplateUpdateParams,
): PromptTemplate {
  return { ...template, ...params } as const;
}
