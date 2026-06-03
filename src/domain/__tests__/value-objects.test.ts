import { describe, it, expect } from "vitest";
import { createPromptId, createBlockId, createTemplateId, createVersionId } from "@/domain/value-objects";
import { createVersionNumber, incrementVersionNumber } from "@/domain/value-objects/VersionNumber";
import { createTimestamp } from "@/domain/value-objects/Timestamp";
import { createTag } from "@/domain/value-objects/Tag";
import { createBlockContent } from "@/domain/value-objects/BlockContent";
import { createQualityScore, calculateOverallScore, qualityScoreToGrade } from "@/domain/value-objects/QualityScore";
import { createValidationResult } from "@/domain/value-objects/ValidationResult";
import { createExportResult } from "@/domain/value-objects/ExportResult";
import { BlockType, ExportFormat } from "@/domain/types";

describe("Value Objects", () => {
  describe("IDs", () => {
    it("should generate unique prompt IDs", () => {
      const id1 = createPromptId();
      const id2 = createPromptId();
      expect(id1).not.toBe(id2);
    });

    it("should generate unique block IDs", () => {
      const id1 = createBlockId();
      const id2 = createBlockId();
      expect(id1).not.toBe(id2);
    });

    it("should generate unique template IDs", () => {
      const id1 = createTemplateId();
      const id2 = createTemplateId();
      expect(id1).not.toBe(id2);
    });

    it("should generate unique version IDs", () => {
      const id1 = createVersionId();
      const id2 = createVersionId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("VersionNumber", () => {
    it("should create a valid version number", () => {
      const v = createVersionNumber(1);
      expect(v.value).toBe(1);
    });

    it("should reject negative version numbers", () => {
      expect(() => createVersionNumber(-1)).toThrow();
    });

    it("should reject non-integer version numbers", () => {
      expect(() => createVersionNumber(1.5)).toThrow();
    });

    it("should increment version numbers", () => {
      const v1 = createVersionNumber(1);
      const v2 = incrementVersionNumber(v1);
      expect(v2.value).toBe(2);
    });
  });

  describe("Timestamp", () => {
    it("should create timestamp with current date by default", () => {
      const ts = createTimestamp();
      expect(ts.value).toBeInstanceOf(Date);
    });

    it("should create timestamp with given date", () => {
      const date = new Date("2026-01-01");
      const ts = createTimestamp(date);
      expect(ts.value).toBe(date);
    });
  });

  describe("Tag", () => {
    it("should create a lowercase trimmed tag", () => {
      const tag = createTag("  PROMPT  ");
      expect(tag.value).toBe("prompt");
    });

    it("should reject empty tags", () => {
      expect(() => createTag("  ")).toThrow();
    });
  });

  describe("BlockContent", () => {
    it("should create text-based block content", () => {
      const content = createBlockContent(BlockType.Role, { text: "You are an expert" });
      expect(content.type).toBe(BlockType.Role);
    });

    it("should create examples block content", () => {
      const content = createBlockContent(BlockType.Examples, {
        pairs: [{ input: "Q1", output: "A1" }],
      });
      expect(content.type).toBe(BlockType.Examples);
    });
  });

  describe("QualityScore", () => {
    it("should create a valid quality score", () => {
      const score = createQualityScore({ clarity: 85, specificity: 70, completeness: 90 });
      expect(score.clarity).toBe(85);
    });

    it("should reject invalid scores", () => {
      expect(() => createQualityScore({ clarity: 150, specificity: 70, completeness: 90 })).toThrow();
    });

    it("should calculate overall score", () => {
      const score = createQualityScore({ clarity: 80, specificity: 70, completeness: 90 });
      expect(calculateOverallScore(score)).toBe(80);
    });

    it("should convert score to letter grade", () => {
      expect(qualityScoreToGrade(95)).toBe("A");
      expect(qualityScoreToGrade(85)).toBe("B");
      expect(qualityScoreToGrade(75)).toBe("C");
      expect(qualityScoreToGrade(65)).toBe("D");
      expect(qualityScoreToGrade(50)).toBe("F");
    });
  });

  describe("ValidationResult", () => {
    it("should pass when no errors", () => {
      const result = createValidationResult({ errors: [], warnings: [] });
      expect(result.passed).toBe(true);
    });

    it("should fail when errors exist", () => {
      const result = createValidationResult({
        errors: [{ rule: "test", message: "error", severity: "error" }],
        warnings: [],
      });
      expect(result.passed).toBe(false);
    });
  });

  describe("ExportResult", () => {
    it("should create an export result", () => {
      const result = createExportResult({
        format: ExportFormat.ChatGPT,
        content: "test prompt",
        tokens: 10,
      });
      expect(result.format).toBe(ExportFormat.ChatGPT);
      expect(result.content).toBe("test prompt");
      expect(result.tokens).toBe(10);
    });
  });
});
