import type { Prompt } from "@/domain/entities/Prompt";
import type { ValidationResult } from "@/domain/value-objects/ValidationResult";
import type { ValidationError } from "@/domain/types";
import { createValidationResult } from "@/domain/value-objects/ValidationResult";
import {
  validateBlockOrder,
  validateRequiredBlocks,
  validateDuplicateBlocks,
} from "@/domain/rules/blockRules";
import { validateVariableConsistency, validateVariableSyntax } from "@/domain/rules/variableRules";

/**
 * Runs all validation rules against a prompt.
 */
export function validatePrompt(prompt: Prompt): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Block validation
  for (const err of validateRequiredBlocks(prompt.blocks)) {
    (err.severity === "error" ? errors : warnings).push(err);
  }

  for (const err of validateDuplicateBlocks(prompt.blocks)) {
    (err.severity === "error" ? errors : warnings).push(err);
  }

  for (const w of validateBlockOrder(prompt.blocks)) {
    warnings.push(w);
  }

  // Variable validation
  for (const err of validateVariableConsistency(prompt.blocks, prompt.variables)) {
    (err.severity === "error" ? errors : warnings).push(err);
  }

  for (const block of prompt.blocks) {
    if (block.enabled) {
      const content = getBlockContentForValidation(block.content);
      for (const err of validateVariableSyntax(content)) {
        (err.severity === "error" ? errors : warnings).push(err);
      }
    }
  }

  return createValidationResult({ errors, warnings });
}

/**
 * Helper to extract text from block content for validation.
 */
function getBlockContentForValidation(content: { type: string; data: Record<string, unknown> }): string {
  const text = content.data.text;
  if (typeof text === "string") return text;

  if (content.type === "Examples") {
    const pairs = content.data.pairs;
    if (Array.isArray(pairs)) {
      return pairs.map((p: Record<string, unknown>) => {
        const input = typeof p.input === "string" ? p.input : "";
        const output = typeof p.output === "string" ? p.output : "";
        return `${input} ${output}`;
      }).join(" ");
    }
  }

  return "";
}
