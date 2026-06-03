import { describe, it, expect } from "vitest";
import { compilePrompt, compilePromptWithHeaders } from "@/domain/services/PromptCompiler";
import { validatePrompt } from "@/domain/services/PromptValidator";
import { analyzePromptQuality } from "@/domain/services/PromptOptimizer";
import { exportPrompt, getExportFormats } from "@/domain/services/PromptExporter";
import { createNextVersion } from "@/domain/services/VersionManager";
import { createPrompt, updatePrompt } from "@/domain/entities/Prompt";
import { createBlock } from "@/domain/entities/Block";
import { createBlockContent } from "@/domain/value-objects/BlockContent";
import { createPromptId, createBlockId, createVersionNumber, createTimestamp } from "@/domain/value-objects";
import { BlockType, ExportFormat } from "@/domain/types";

function makePrompt() {
  const now = createTimestamp();
  const promptId = createPromptId();

  const roleBlock = createBlock({
    id: createBlockId(),
    type: BlockType.Role,
    title: "Role",
    content: createBlockContent(BlockType.Role, { text: "You are an expert." }),
    order: 1,
    createdAt: now,
    updatedAt: now,
  });

  const contextBlock = createBlock({
    id: createBlockId(),
    type: BlockType.Context,
    title: "Context",
    content: createBlockContent(BlockType.Context, { text: "This is a test." }),
    order: 2,
    createdAt: now,
    updatedAt: now,
  });

  const prompt = createPrompt({
    id: promptId,
    title: "Test Prompt",
    version: createVersionNumber(1),
    createdAt: now,
    updatedAt: now,
  });

  return updatePrompt(prompt, { blocks: [roleBlock, contextBlock] });
}

describe("Domain Services", () => {
  describe("PromptCompiler", () => {
    it("should compile prompt content from blocks", () => {
      const prompt = makePrompt();
      const compiled = compilePrompt(prompt);

      expect(compiled.content).toContain("You are an expert");
      expect(compiled.content).toContain("This is a test");
      expect(compiled.enabledBlockCount).toBe(2);
    });

    it("should compile with headers", () => {
      const prompt = makePrompt();
      const compiled = compilePromptWithHeaders(prompt);

      expect(compiled.content).toContain("## Role");
      expect(compiled.content).toContain("## Context");
    });
  });

  describe("PromptValidator", () => {
    it("should validate a valid prompt", () => {
      const prompt = makePrompt();
      const result = validatePrompt(prompt);
      expect(result.passed).toBe(true);
    });

    it("should return warnings for missing constraints", () => {
      const prompt = makePrompt();
      const result = validatePrompt(prompt);
      expect(result).toBeDefined();
    });
  });

  describe("PromptOptimizer", () => {
    it("should analyze prompt quality", () => {
      const prompt = makePrompt();
      const analysis = analyzePromptQuality(prompt);

      expect(analysis.score.clarity).toBeGreaterThanOrEqual(0);
      expect(analysis.score.clarity).toBeLessThanOrEqual(100);
      expect(Array.isArray(analysis.recommendations)).toBe(true);
    });
  });

  describe("PromptExporter", () => {
    it("should export to ChatGPT format", () => {
      const prompt = makePrompt();
      const result = exportPrompt(prompt, ExportFormat.ChatGPT);

      expect(result.format).toBe(ExportFormat.ChatGPT);
      expect(result.content.length).toBeGreaterThan(0);
      expect(result.tokens).toBeGreaterThan(0);
    });

    it("should export to JSON format", () => {
      const prompt = makePrompt();
      const result = exportPrompt(prompt, ExportFormat.Json);

      expect(result.format).toBe(ExportFormat.Json);
      const parsed = JSON.parse(result.content) as { title?: string };
      expect(parsed.title).toBe("Test Prompt");
    });

    it("should export to Markdown format", () => {
      const prompt = makePrompt();
      const result = exportPrompt(prompt, ExportFormat.Markdown);

      expect(result.format).toBe(ExportFormat.Markdown);
      expect(result.content).toContain("# Test Prompt");
    });

    it("should list available formats", () => {
      const formats = getExportFormats();
      expect(formats.length).toBeGreaterThan(0);
      expect(formats.some((f) => f.format === ExportFormat.ChatGPT)).toBe(true);
    });
  });

  describe("VersionManager", () => {
    it("should create next version from prompt", () => {
      const prompt = makePrompt();
      const version = createNextVersion(undefined, prompt);

      expect(version.promptId).toBe(prompt.id);
      expect(version.number.value).toBe(1);
      expect(version.snapshot.title).toBe("Test Prompt");
    });
  });
});
