import type { PromptId, BlockId, TemplateId, VersionId } from "@/domain/types";

let counter = 0;

/**
 * Generates a unique ID. Uses timestamp + counter for uniqueness
 * without external dependencies.
 */
function generateId(prefix: string): string {
  counter += 1;
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  const seq = counter.toString(36);
  return `${prefix}_${timestamp}_${random}_${seq}`;
}

export function createPromptId(): PromptId {
  return generateId("p") as PromptId;
}

export function createBlockId(): BlockId {
  return generateId("b") as BlockId;
}

export function createTemplateId(): TemplateId {
  return generateId("t") as TemplateId;
}

export function createVersionId(): VersionId {
  return generateId("v") as VersionId;
}
