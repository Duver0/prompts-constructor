/**
 * Shared types used across domain entities.
 * These are pure data structures with no behavior.
 */

export type Variable = Readonly<{
  name: string;
  defaultValue?: string;
  required: boolean;
  description?: string;
}>;

export type BlockTemplate = Readonly<{
  type: string;
  title?: string;
  content: Record<string, unknown>;
  enabled: boolean;
  order: number;
}>;
