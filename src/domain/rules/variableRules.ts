import type { ValidationError } from "@/domain/types";
import type { Block } from "@/domain/entities/Block";
import type { Variable } from "@/domain/entities/SharedTypes";
import { getBlockContentText } from "@/domain/value-objects/BlockContent";

const VARIABLE_PATTERN = /\{\{(\w+)\}\}/g;
const VARIABLE_DETECT_PATTERN = /\{\{(.+?)\}\}/g;

/**
 * Validates that all variables used in blocks are declared.
 */
export function validateVariableConsistency(
  blocks: readonly Block[],
  variables: readonly Variable[],
): ValidationError[] {
  const errors: ValidationError[] = [];
  const declaredNames = new Set(variables.map((v) => v.name));
  const usedNames = new Set<string>();

  // Collect all variable usages from block content
  for (const block of blocks) {
    if (!block.enabled) continue;
    const text = getBlockContentText(block.content);
    const matches = text.matchAll(VARIABLE_PATTERN);
    for (const match of matches) {
      const name = match[1];
      if (name) usedNames.add(name);
    }
  }

  // Find undeclared variables
  for (const name of usedNames) {
    if (!declaredNames.has(name)) {
      errors.push({
        rule: "variable-consistency",
        message: `Variable "{{${name}}}" is used but not declared`,
        severity: "error",
      });
    }
  }

  // Find declared but unused variables
  for (const variable of variables) {
    if (!usedNames.has(variable.name)) {
      errors.push({
        rule: "variable-consistency",
        message: `Variable "${variable.name}" is declared but never used`,
        severity: "warning",
      });
    }
  }

  return errors;
}

/**
 * Validates {{variable}} syntax in a content string.
 */
export function validateVariableSyntax(content: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const matches = content.matchAll(VARIABLE_DETECT_PATTERN);

  for (const match of matches) {
    const name = match[1];
    if (name && name.length === 0) {
      errors.push({
        rule: "variable-syntax",
        message: "Empty variable placeholder found. Use {{variable_name}} syntax.",
        severity: "error",
      });
    }
    if (name && !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
      errors.push({
        rule: "variable-syntax",
        message: `Invalid variable name "${name}". Use alphanumeric characters and underscores only.`,
        severity: "error",
      });
    }
  }

  return errors;
}

/**
 * Extracts all variable names from content.
 */
export function extractVariableNames(content: string): string[] {
  const names: string[] = [];
  const matches = content.matchAll(VARIABLE_PATTERN);
  for (const match of matches) {
    if (match[1]) names.push(match[1]);
  }
  return names;
}

/**
 * Interpolates variables in content.
 */
export function interpolateVariables(
  content: string,
  variables: Record<string, string>,
): string {
  return content.replace(VARIABLE_PATTERN, (_, name: string) => {
    return variables[name] ?? `{{${name}}}`;
  });
}
