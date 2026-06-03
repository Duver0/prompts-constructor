import { describe, it, expect } from "vitest";
import { validateRequiredBlocks, validateDuplicateBlocks } from "@/domain/rules/blockRules";
import { validateVariableConsistency, validateVariableSyntax } from "@/domain/rules/variableRules";
import { validateVersionIncrement } from "@/domain/rules/versionRules";
import { calculateTokenCount, fitsInContextWindow } from "@/domain/rules/tokenRules";
import { detectAmbiguity, detectRedundancy } from "@/domain/rules/qualityRules";
import { createBlock } from "@/domain/entities/Block";
import { createBlockContent } from "@/domain/value-objects/BlockContent";
import { createBlockId, createVersionNumber, createTimestamp } from "@/domain/value-objects";
import { BlockType, ProviderType } from "@/domain/types";

function makeBlock(type: BlockType, text: string) {
  const now = createTimestamp();
  return createBlock({
    id: createBlockId(),
    type,
    title: type,
    content: createBlockContent(type, { text }),
    order: 1,
    createdAt: now,
    updatedAt: now,
  });
}

describe("Business Rules", () => {
  describe("validateRequiredBlocks", () => {
    it("should error when no Role block exists", () => {
      const blocks = [makeBlock(BlockType.Context, "context")];
      const errors = validateRequiredBlocks(blocks);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0]?.rule).toBe("required-blocks");
    });

    it("should pass when Role block exists", () => {
      const blocks = [makeBlock(BlockType.Role, "role")];
      const errors = validateRequiredBlocks(blocks);
      expect(errors).toHaveLength(0);
    });
  });

  describe("validateDuplicateBlocks", () => {
    it("should error on duplicate Role blocks", () => {
      const blocks = [
        makeBlock(BlockType.Role, "role 1"),
        makeBlock(BlockType.Role, "role 2"),
      ];
      const errors = validateDuplicateBlocks(blocks);
      expect(errors.length).toBeGreaterThan(0);
    });

    it("should allow duplicate Notes blocks", () => {
      const blocks = [
        makeBlock(BlockType.Notes, "note 1"),
        makeBlock(BlockType.Notes, "note 2"),
      ];
      const errors = validateDuplicateBlocks(blocks);
      expect(errors).toHaveLength(0);
    });
  });

  describe("validateVariableConsistency", () => {
    it("should error when variable is used but not declared", () => {
      const blocks = [makeBlock(BlockType.Role, "Hello {{name}}")];
      const errors = validateVariableConsistency(blocks, []);
      expect(errors.length).toBeGreaterThan(0);
    });

    it("should pass when variables are declared and used", () => {
      const blocks = [makeBlock(BlockType.Role, "Hello {{name}}")];
      const errors = validateVariableConsistency(blocks, [{ name: "name", required: true }]);
      const hasErrors = errors.some((e) => e.severity === "error");
      expect(hasErrors).toBe(false);
    });
  });

  describe("validateVariableSyntax", () => {
    it("should detect invalid variable names", () => {
      const errors = validateVariableSyntax("{{invalid-name}}");
      expect(errors.length).toBeGreaterThan(0);
    });

    it("should accept valid variable names", () => {
      const errors = validateVariableSyntax("{{valid_name}}");
      const hasErrors = errors.some((e) => e.severity === "error");
      expect(hasErrors).toBe(false);
    });
  });

  describe("validateVersionIncrement", () => {
    it("should validate sequential increment", () => {
      expect(validateVersionIncrement(createVersionNumber(1), createVersionNumber(2))).toBe(true);
    });

    it("should reject non-sequential increment", () => {
      expect(validateVersionIncrement(createVersionNumber(1), createVersionNumber(3))).toBe(false);
    });
  });

  describe("calculateTokenCount", () => {
    it("should estimate tokens for text", () => {
      const count = calculateTokenCount("Hello world");
      expect(count).toBeGreaterThan(0);
    });

    it("should return different counts for different providers", () => {
      const text = "A".repeat(100);
      const chatCount = calculateTokenCount(text, ProviderType.ChatGPT);
      const claudeCount = calculateTokenCount(text, ProviderType.Claude);
      expect(chatCount).not.toBe(claudeCount);
    });
  });

  describe("fitsInContextWindow", () => {
    it("should report if content fits", () => {
      const result = fitsInContextWindow("short text", ProviderType.ChatGPT);
      expect(result.fits).toBe(true);
      expect(result.maxTokens).toBe(128000);
    });
  });

  describe("detectAmbiguity", () => {
    it("should detect ambiguous words", () => {
      const matches = detectAmbiguity("This might be somewhat unclear");
      expect(matches.length).toBeGreaterThan(0);
    });

    it("should not flag clear text", () => {
      const matches = detectAmbiguity("Always use specific terms in every instruction.");
      expect(matches).toHaveLength(0);
    });
  });

  describe("detectRedundancy", () => {
    it("should detect similar content across blocks", () => {
      const blocks = [
        makeBlock(BlockType.Role, "You are an expert software engineer"),
        makeBlock(BlockType.Context, "You are an expert software engineer with experience"),
      ];
      const matches = detectRedundancy(blocks);
      expect(matches.length).toBeGreaterThan(0);
    });

    it("should not flag different content", () => {
      const blocks = [
        makeBlock(BlockType.Role, "You are an expert chef"),
        makeBlock(BlockType.Context, "The user has a dog named Max"),
      ];
      const matches = detectRedundancy(blocks);
      expect(matches).toHaveLength(0);
    });
  });
});
