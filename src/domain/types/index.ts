// ──────────────────────────────────────────────
// Domain Types — Shared enums, type guards, and branded types
// ──────────────────────────────────────────────

// ── Branded ID types ──────────────────────────
export type Brand<K, T> = K & { __brand: T };

export type PromptId = Brand<string, "PromptId">;
export type BlockId = Brand<string, "BlockId">;
export type TemplateId = Brand<string, "TemplateId">;
export type VersionId = Brand<string, "VersionId">;

// ── Enums ─────────────────────────────────────

export enum BlockType {
  Role = "Role",
  Context = "Context",
  Objective = "Objective",
  Constraints = "Constraints",
  Examples = "Examples",
  OutputFormat = "OutputFormat",
  Variables = "Variables",
  Notes = "Notes",
}

export enum PromptStatus {
  Draft = "Draft",
  Published = "Published",
  Archived = "Archived",
}

export enum VersionStatus {
  Draft = "Draft",
  Published = "Published",
  Archived = "Archived",
}

export enum TemplateCategory {
  Coding = "Coding",
  Architecture = "Architecture",
  ContentCreation = "ContentCreation",
  Marketing = "Marketing",
  Analysis = "Analysis",
  Research = "Research",
  ProductDesign = "ProductDesign",
  Custom = "Custom",
}

export enum ExportFormat {
  ChatGPT = "ChatGPT",
  Claude = "Claude",
  Gemini = "Gemini",
  OpenRouter = "OpenRouter",
  Markdown = "Markdown",
  Json = "Json",
}

export enum ProviderType {
  ChatGPT = "ChatGPT",
  Claude = "Claude",
  Gemini = "Gemini",
  OpenRouter = "OpenRouter",
}

// ── Type guards ───────────────────────────────

export function isPromptId(value: string): value is PromptId {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function isBlockType(value: string): value is BlockType {
  return Object.values(BlockType).includes(value as BlockType);
}

export function isPromptStatus(value: string): value is PromptStatus {
  return Object.values(PromptStatus).includes(value as PromptStatus);
}

export function isVersionStatus(value: string): value is VersionStatus {
  return Object.values(VersionStatus).includes(value as VersionStatus);
}

export function isTemplateCategory(value: string): value is TemplateCategory {
  return Object.values(TemplateCategory).includes(value as TemplateCategory);
}

export function isExportFormat(value: string): value is ExportFormat {
  return Object.values(ExportFormat).includes(value as ExportFormat);
}

export function isProviderType(value: string): value is ProviderType {
  return Object.values(ProviderType).includes(value as ProviderType);
}

// ── Helper types ──────────────────────────────

export type Timestamp = Readonly<{
  value: Date;
}>;

export type ValidationError = Readonly<{
  rule: string;
  message: string;
  severity: "error" | "warning";
  blockId?: BlockId;
}>;

export type AmbiguityMatch = Readonly<{
  text: string;
  position: number;
  suggestion: string;
}>;

export type RedundancyMatch = Readonly<{
  blockIds: [BlockId, BlockId];
  similarity: number;
  suggestion: string;
}>;
