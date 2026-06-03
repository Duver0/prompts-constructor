import type { ExportFormat } from "@/domain/types";

export type ExportResult = Readonly<{
  format: ExportFormat;
  content: string;
  tokens: number;
  exportedAt: Date;
}>;

export function createExportResult(params: {
  format: ExportFormat;
  content: string;
  tokens: number;
  exportedAt?: Date;
}): ExportResult {
  return {
    format: params.format,
    content: params.content,
    tokens: params.tokens,
    exportedAt: params.exportedAt ?? new Date(),
  } as const;
}
