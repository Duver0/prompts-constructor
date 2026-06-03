import type { Prompt } from "@/domain/entities/Prompt";
import type { Block } from "@/domain/entities/Block";
import type { Variable } from "@/domain/entities/SharedTypes";
import type { Tag } from "@/domain/value-objects/Tag";
import type { PromptId } from "@/domain/types";
import { BlockType } from "@/domain/types";

/**
 * PromptAggregate enforces consistency boundaries for the Prompt root entity
 * and its dependent entities (Blocks, Variables).
 */
export type PromptAggregate = Readonly<{
  root: Prompt;
  blocks: readonly Block[];
  variables: readonly Variable[];
  tags: readonly Tag[];
}>;

export function createPromptAggregate(root: Prompt): PromptAggregate {
  return {
    root,
    blocks: root.blocks,
    variables: root.variables,
    tags: root.tags,
  } as const;
}

export function aggregateHasRoleBlock(aggregate: PromptAggregate): boolean {
  return aggregate.blocks.some(
    (b) => b.enabled && b.type === BlockType.Role,
  );
}

export function aggregateGetBlocksOfType(
  aggregate: PromptAggregate,
  type: BlockType,
): readonly Block[] {
  return aggregate.blocks.filter((b) => b.type === type);
}

export function aggregateGetPromptId(aggregate: PromptAggregate): PromptId {
  return aggregate.root.id;
}
