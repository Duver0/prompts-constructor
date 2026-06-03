import type { PromptId, PromptStatus, Timestamp } from "@/domain/types";
import type { Block } from "@/domain/entities/Block";
import type { Variable } from "@/domain/entities/SharedTypes";
import type { VersionNumber } from "@/domain/value-objects/VersionNumber";
import type { Tag } from "@/domain/value-objects/Tag";
import type { TemplateId } from "@/domain/types";

export type Prompt = Readonly<{
  id: PromptId;
  title: string;
  blocks: readonly Block[];
  version: VersionNumber;
  status: PromptStatus;
  variables: readonly Variable[];
  templateId: TemplateId | undefined;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tags: readonly Tag[];
}>;

export type PromptUpdateParams = Partial<{
  title: string;
  blocks: readonly Block[];
  status: PromptStatus;
  variables: readonly Variable[];
  tags: readonly Tag[];
}>;

export function createPrompt(params: {
  id: PromptId;
  title: string;
  version: VersionNumber;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  templateId?: TemplateId;
}): Prompt {
  return {
    id: params.id,
    title: params.title,
    blocks: [],
    version: params.version,
    status: "Draft" as PromptStatus,
    variables: [],
    templateId: params.templateId,
    createdAt: params.createdAt,
    updatedAt: params.updatedAt,
    tags: [],
  } as const;
}

export function updatePrompt(prompt: Prompt, params: PromptUpdateParams): Prompt {
  return { ...prompt, ...params } as const;
}

export function changePromptStatus(prompt: Prompt, status: PromptStatus): Prompt {
  return { ...prompt, status } as const;
}
