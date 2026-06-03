import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePromptStore } from "@/presentation/stores/usePromptStore";
import { useExportStore } from "@/presentation/stores/useExportStore";
import { useUIStore } from "@/presentation/stores/useUIStore";
import { Button } from "@/presentation/shared/atoms/Button";
import { Badge } from "@/presentation/shared/atoms/Badge";
import { Card } from "@/presentation/shared/molecules/Card";
import { EmptyState } from "@/presentation/shared/molecules/EmptyState";
import type { PromptId } from "@/domain/types";
import { ExportFormat } from "@/domain/types";
import { exportPrompt } from "@/domain/services/PromptExporter";

const FORMAT_LABELS: Record<string, string> = {
  [ExportFormat.ChatGPT]: "ChatGPT",
  [ExportFormat.Claude]: "Claude",
  [ExportFormat.Gemini]: "Gemini",
  [ExportFormat.OpenRouter]: "OpenRouter",
  [ExportFormat.Json]: "JSON",
  [ExportFormat.Markdown]: "Markdown",
};

const FORMAT_DESCRIPTIONS: Record<string, string> = {
  [ExportFormat.ChatGPT]: "Optimized for ChatGPT with system/user message structure",
  [ExportFormat.Claude]: "Formatted for Claude's XML-tagged prompt style",
  [ExportFormat.Gemini]: "Structured for Google Gemini API format",
  [ExportFormat.OpenRouter]: "Compatible with OpenRouter unified API",
  [ExportFormat.Json]: "Machine-readable JSON with full prompt structure",
  [ExportFormat.Markdown]: "Human-readable Markdown document",
};

export default function ExportCenterPage() {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();
  const pid = promptId as PromptId | undefined;

  const { getPromptById } = usePromptStore();
  const { selectedFormat, lastExport, exporting, setFormat, setLastExport, setExporting } = useExportStore();
  const addToast = useUIStore((s) => s.addToast);
  const prompt = pid ? getPromptById(pid) : undefined;

  useEffect(() => {
    setLastExport(null);
  }, [setLastExport]);

  const handleExport = () => {
    if (!prompt) return;
    setExporting(true);
    try {
      const result = exportPrompt(prompt, selectedFormat);
      setLastExport(result);
      addToast({ message: `Exported as ${FORMAT_LABELS[selectedFormat] ?? selectedFormat}`, type: "success" });
    } catch {
      addToast({ message: "Export failed", type: "error" });
    } finally {
      setExporting(false);
    }
  };

  const handleCopy = () => {
    if (!lastExport) return;
    navigator.clipboard.writeText(lastExport.content).catch(() => {
      addToast({ message: "Failed to copy", type: "error" });
    });
  };

  return (
    <div className="container-main py-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => { void navigate(pid ? `/library/${String(pid)}` : "/library"); }}>
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Export Center
          </h1>
          {prompt && (
            <p className="text-sm text-surface-500">{prompt.title}</p>
          )}
        </div>
      </div>

      {!prompt ? (
        <EmptyState title="Prompt not found" description="This prompt no longer exists." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Format Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              Export Format
            </h2>
            {Object.values(ExportFormat).map((format) => (
              <Card
                key={format}
                hover
                onClick={() => { setFormat(format); }}
                className={`cursor-pointer ${selectedFormat === format ? "ring-2 ring-primary-500" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                      {FORMAT_LABELS[format] ?? format}
                    </h3>
                    <p className="mt-1 text-sm text-surface-500">
                      {FORMAT_DESCRIPTIONS[format] ?? ""}
                    </p>
                  </div>
                  {selectedFormat === format && (
                    <Badge variant="info">Selected</Badge>
                  )}
                </div>
              </Card>
            ))}

            <Button
              className="w-full"
              onClick={handleExport}
              loading={exporting}
            >
              {exporting ? "Exporting..." : "Export"}
            </Button>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Preview
              </h2>
              {lastExport && (
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={handleCopy}>
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const blob = new Blob([lastExport.content], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${prompt.title.replace(/\s+/g, "-").toLowerCase()}.${selectedFormat === ExportFormat.Json ? "json" : "md"}`;
                      a.click();
                      URL.revokeObjectURL(url);
                      addToast({ message: "File downloaded", type: "success" });
                    }}
                  >
                    Download
                  </Button>
                </div>
              )}
            </div>
            {lastExport ? (
              <div className="space-y-2">
                <p className="text-xs text-surface-500">
                  ~{lastExport.tokens} tokens · {FORMAT_LABELS[lastExport.format] ?? lastExport.format}
                </p>
                <pre className="max-h-[60vh] overflow-auto rounded-lg border border-surface-200 bg-surface-50 p-4 text-sm dark:border-surface-700 dark:bg-surface-950">
                  <code>{lastExport.content}</code>
                </pre>
              </div>
            ) : (
              <EmptyState
                title="No export yet"
                description="Select a format and click Export to see the result"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
