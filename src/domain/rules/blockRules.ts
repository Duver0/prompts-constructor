import { BlockType } from "@/domain/types";
import type { ValidationError } from "@/domain/types";
import type { Block } from "@/domain/entities/Block";

/**
 * Validates block ordering constraints.
 * Role must be first, and certain ordering conventions apply.
 */
export function validateBlockOrder(blocks: readonly Block[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  for (let i = 0; i < sorted.length; i++) {
    const block = sorted[i];
    if (!block || !block.enabled) continue;

    // Role must be first enabled block
    if (block.type === BlockType.Role && i > 0) {
      const hasEnabledBefore = sorted.slice(0, i).some((b) => b.enabled);
      if (hasEnabledBefore) {
        errors.push({
          rule: "block-order",
          message: "Role block should be the first block in the prompt",
          severity: "warning",
          blockId: block.id,
        });
      }
    }
  }

  return errors;
}

/**
 * Checks that required block types are present.
 * At minimum, a prompt should have a Role block.
 */
export function validateRequiredBlocks(blocks: readonly Block[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const enabledBlocks = blocks.filter((b) => b.enabled);
  const presentTypes = new Set(enabledBlocks.map((b) => b.type));

  if (!presentTypes.has(BlockType.Role)) {
    errors.push({
      rule: "required-blocks",
      message: "Prompt must have at least one Role block",
      severity: "error",
    });
  }

  return errors;
}

/**
 * Detects duplicate block types.
 * Some block types (like Role, Objective) should only appear once.
 */
export function validateDuplicateBlocks(blocks: readonly Block[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const singleTypes = new Set([
    BlockType.Role,
    BlockType.Context,
    BlockType.Objective,
    BlockType.OutputFormat,
  ]);

  const seen = new Map<BlockType, Block>();

  for (const block of blocks) {
    if (!singleTypes.has(block.type) || !block.enabled) continue;

    const existing = seen.get(block.type);
    if (existing) {
      errors.push({
        rule: "duplicate-blocks",
        message: `Duplicate ${block.type} block detected. Only one ${block.type} block is allowed.`,
        severity: "error",
        blockId: block.id,
      });
    } else {
      seen.set(block.type, block);
    }
  }

  return errors;
}
