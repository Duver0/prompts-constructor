import type { ValidationError } from "@/domain/types";

export type ValidationResult = Readonly<{
  passed: boolean;
  errors: readonly ValidationError[];
  warnings: readonly ValidationError[];
  timestamp: Date;
}>;

export function createValidationResult(params: {
  errors: readonly ValidationError[];
  warnings: readonly ValidationError[];
}): ValidationResult {
  return {
    passed: params.errors.length === 0,
    errors: params.errors,
    warnings: params.warnings,
    timestamp: new Date(),
  } as const;
}

export function validationResultIsValid(result: ValidationResult): boolean {
  return result.passed;
}
