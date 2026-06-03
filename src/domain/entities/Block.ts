import type { BlockId, BlockType, Timestamp } from "@/domain/types";
import type { BlockContent } from "@/domain/value-objects/BlockContent";

export type Block = Readonly<{
  id: BlockId;
  type: BlockType;
  title: string;
  content: BlockContent;
  enabled: boolean;
  order: number;
  collapsed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}>;

export type BlockUpdateParams = Partial<{
  title: string;
  content: BlockContent;
  enabled: boolean;
  order: number;
  collapsed: boolean;
}>;

export function createBlock(params: {
  id: BlockId;
  type: BlockType;
  title: string;
  content: BlockContent;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}): Block {
  return {
    id: params.id,
    type: params.type,
    title: params.title,
    content: params.content,
    enabled: true,
    order: params.order,
    collapsed: false,
    createdAt: params.createdAt,
    updatedAt: params.updatedAt,
  } as const;
}

export function updateBlock(block: Block, params: BlockUpdateParams): Block {
  return {
    ...block,
    ...params,
    updatedAt: block.updatedAt, // caller must update timestamp
  } as const;
}

export function toggleBlockEnabled(block: Block): Block {
  return { ...block, enabled: !block.enabled } as const;
}

export function moveBlock(block: Block, newOrder: number): Block {
  return { ...block, order: newOrder } as const;
}

export function blocksEqual(a: Block, b: Block): boolean {
  return a.id === b.id;
}
