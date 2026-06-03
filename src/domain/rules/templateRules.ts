import type { ValidationError } from "@/domain/types";
import { BlockType, TemplateCategory } from "@/domain/types";
import type { PromptTemplate } from "@/domain/entities/PromptTemplate";

const REQUIRED_BLOCKS_PER_CATEGORY: Record<TemplateCategory, readonly BlockType[]> = {
  [TemplateCategory.Coding]: [BlockType.Role, BlockType.Objective, BlockType.Constraints, BlockType.OutputFormat],
  [TemplateCategory.Architecture]: [BlockType.Role, BlockType.Context, BlockType.Objective, BlockType.Constraints],
  [TemplateCategory.ContentCreation]: [BlockType.Role, BlockType.Context, BlockType.Objective, BlockType.Examples],
  [TemplateCategory.Marketing]: [BlockType.Role, BlockType.Context, BlockType.Objective, BlockType.OutputFormat],
  [TemplateCategory.Analysis]: [BlockType.Role, BlockType.Context, BlockType.Objective, BlockType.OutputFormat],
  [TemplateCategory.Research]: [BlockType.Role, BlockType.Objective, BlockType.Constraints, BlockType.OutputFormat],
  [TemplateCategory.ProductDesign]: [BlockType.Role, BlockType.Context, BlockType.Objective, BlockType.Constraints, BlockType.Examples],
  [TemplateCategory.Custom]: [BlockType.Role, BlockType.Objective],
};

/**
 * Checks that a template has all required blocks for its category.
 */
export function validateTemplateCompleteness(
  template: PromptTemplate,
): ValidationError[] {
  const errors: ValidationError[] = [];
  const requiredTypes = REQUIRED_BLOCKS_PER_CATEGORY[template.category];
  const presentTypes = new Set(template.blocks.map((b) => b.type));

  for (const requiredType of requiredTypes) {
    if (!presentTypes.has(requiredType)) {
      errors.push({
        rule: "template-completeness",
        message: `Template is missing required block type: ${requiredType}`,
        severity: "error",
      });
    }
  }

  return errors;
}

/**
 * Returns required block types for a given category.
 */
export function getRequiredBlocksForCategory(
  category: TemplateCategory,
): readonly BlockType[] {
  return REQUIRED_BLOCKS_PER_CATEGORY[category];
}
