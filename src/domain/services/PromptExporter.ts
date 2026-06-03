import type { Prompt } from "@/domain/entities/Prompt";
import { ExportFormat, ProviderType } from "@/domain/types";
import type { ExportResult } from "@/domain/value-objects/ExportResult";
import { createExportResult } from "@/domain/value-objects/ExportResult";
import { compilePrompt, compilePromptWithHeaders } from "@/domain/services/PromptCompiler";
import { calculateTokenCount } from "@/domain/rules/tokenRules";

type FormatConfig = {
  label: string;
  providerType: ProviderType;
  useHeaders: boolean;
  wrapInArtifact: boolean;
  systemPrefix?: string;
  userPrefix?: string;
};

const FORMAT_CONFIG: Record<string, FormatConfig> = {
  [ExportFormat.ChatGPT]: {
    label: "ChatGPT",
    providerType: ProviderType.ChatGPT,
    useHeaders: true,
    wrapInArtifact: false,
    systemPrefix: "System:",
  },
  [ExportFormat.Claude]: {
    label: "Claude",
    providerType: ProviderType.Claude,
    useHeaders: true,
    wrapInArtifact: true,
  },
  [ExportFormat.Gemini]: {
    label: "Gemini",
    providerType: ProviderType.Gemini,
    useHeaders: true,
    wrapInArtifact: false,
  },
  [ExportFormat.OpenRouter]: {
    label: "OpenRouter",
    providerType: ProviderType.OpenRouter,
    useHeaders: true,
    wrapInArtifact: false,
  },
  [ExportFormat.Markdown]: {
    label: "Markdown",
    providerType: ProviderType.ChatGPT,
    useHeaders: true,
    wrapInArtifact: false,
  },
  [ExportFormat.Json]: {
    label: "JSON",
    providerType: ProviderType.ChatGPT,
    useHeaders: false,
    wrapInArtifact: false,
  },
};

/**
 * Exports a prompt to the specified format.
 */
export function exportPrompt(prompt: Prompt, format: ExportFormat): ExportResult {
  const config = FORMAT_CONFIG[format];

  if (!config) {
    return createExportResult({
      format,
      content: "",
      tokens: 0,
    });
  }

  let content: string;

  switch (format) {
    case ExportFormat.Json: {
      content = JSON.stringify(
        {
          title: prompt.title,
          blocks: prompt.blocks.map((b) => ({
            type: b.type,
            title: b.title,
            enabled: b.enabled,
            order: b.order,
          })),
          variables: prompt.variables,
        },
        null,
        2,
      );
      break;
    }

    case ExportFormat.Markdown: {
      const compiled = compilePromptWithHeaders(prompt);
      content = `# ${prompt.title}\n\n${compiled.content}`;
      break;
    }

    default: {
      const compiled = config.useHeaders
        ? compilePromptWithHeaders(prompt)
        : compilePrompt(prompt);

      if (config.wrapInArtifact) {
        content = compiled.content;
      } else if (config.systemPrefix) {
        content = `${config.systemPrefix}\n${compiled.content}`;
      } else {
        content = compiled.content;
      }
      break;
    }
  }

  const tokens = calculateTokenCount(content, config.providerType);

  return createExportResult({
    format,
    content,
    tokens,
  });
}

/**
 * Returns available export formats with metadata.
 */
export function getExportFormats(): Array<{ format: ExportFormat; label: string }> {
  return Object.entries(FORMAT_CONFIG).map(([format, config]) => ({
    format: format as ExportFormat,
    label: config.label,
  }));
}
