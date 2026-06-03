import type { Block } from "@/domain/entities/Block";
import type { Variable } from "@/domain/entities/SharedTypes";
import { PromptStatus } from "@/domain/types";
import type { PromptId } from "@/domain/types";

/**
 * Immutable snapshot of a prompt's complete state at a point in time.
 * Used for versioning — versions store snapshots, not references.
 */
export type PromptSnapshot = Readonly<{
  promptId: PromptId;
  title: string;
  blocks: readonly Block[];
  variables: readonly Variable[];
  status: PromptStatus;
  tags: readonly string[];
}>;

export function createPromptSnapshot(params: {
  promptId: PromptId;
  title: string;
  blocks: readonly Block[];
  variables: readonly Variable[];
  status: PromptStatus;
  tags: readonly string[];
}): PromptSnapshot {
  return { ...params } as const;
}
