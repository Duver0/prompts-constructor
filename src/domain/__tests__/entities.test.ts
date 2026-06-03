import { describe, it, expect } from "vitest";
import { createPrompt, updatePrompt, changePromptStatus } from "@/domain/entities/Prompt";
import { createBlock, toggleBlockEnabled, moveBlock } from "@/domain/entities/Block";
import { createVersion, changeVersionStatus } from "@/domain/entities/Version";
import { createPromptTemplate } from "@/domain/entities/PromptTemplate";
import { createPromptId, createBlockId, createTemplateId, createVersionId, createVersionNumber, createTimestamp } from "@/domain/value-objects";
import { createBlockContent } from "@/domain/value-objects/BlockContent";
import { createPromptSnapshot } from "@/domain/value-objects/PromptSnapshot";
import { BlockType, PromptStatus, VersionStatus, TemplateCategory } from "@/domain/types";

describe("Entities", () => {
  describe("Prompt", () => {
    it("should create a prompt with default values", () => {
      const now = createTimestamp();
      const prompt = createPrompt({
        id: createPromptId(),
        title: "Test Prompt",
        version: createVersionNumber(1),
        createdAt: now,
        updatedAt: now,
      });

      expect(prompt.title).toBe("Test Prompt");
      expect(prompt.status).toBe(PromptStatus.Draft);
      expect(prompt.blocks).toHaveLength(0);
      expect(prompt.variables).toHaveLength(0);
      expect(prompt.tags).toHaveLength(0);
    });

    it("should update prompt properties", () => {
      const now = createTimestamp();
      const prompt = createPrompt({
        id: createPromptId(),
        title: "Original",
        version: createVersionNumber(1),
        createdAt: now,
        updatedAt: now,
      });

      const updated = updatePrompt(prompt, { title: "Updated" });
      expect(updated.title).toBe("Updated");
    });

    it("should change prompt status", () => {
      const now = createTimestamp();
      const prompt = createPrompt({
        id: createPromptId(),
        title: "Test",
        version: createVersionNumber(1),
        createdAt: now,
        updatedAt: now,
      });

      const published = changePromptStatus(prompt, PromptStatus.Published);
      expect(published.status).toBe(PromptStatus.Published);
    });
  });

  describe("Block", () => {
    it("should create a block with default values", () => {
      const now = createTimestamp();
      const blockId = createBlockId();
      const block = createBlock({
        id: blockId,
        type: BlockType.Role,
        title: "Role",
        content: createBlockContent(BlockType.Role, { text: "You are an expert" }),
        order: 1,
        createdAt: now,
        updatedAt: now,
      });

      expect(block.id).toBe(blockId);
      expect(block.enabled).toBe(true);
      expect(block.collapsed).toBe(false);
      expect(block.order).toBe(1);
    });

    it("should toggle block enabled state", () => {
      const now = createTimestamp();
      const block = createBlock({
        id: createBlockId(),
        type: BlockType.Role,
        title: "Role",
        content: createBlockContent(BlockType.Role, { text: "test" }),
        order: 1,
        createdAt: now,
        updatedAt: now,
      });

      const toggled = toggleBlockEnabled(block);
      expect(toggled.enabled).toBe(false);
    });

    it("should move block to new order", () => {
      const now = createTimestamp();
      const block = createBlock({
        id: createBlockId(),
        type: BlockType.Role,
        title: "Role",
        content: createBlockContent(BlockType.Role, { text: "test" }),
        order: 1,
        createdAt: now,
        updatedAt: now,
      });

      const moved = moveBlock(block, 3);
      expect(moved.order).toBe(3);
    });
  });

  describe("PromptTemplate", () => {
    it("should create a template with default values", () => {
      const now = createTimestamp();
      const template = createPromptTemplate({
        id: createTemplateId(),
        name: "Test Template",
        category: TemplateCategory.Coding,
        version: createVersionNumber(1),
        createdAt: now,
      });

      expect(template.name).toBe("Test Template");
      expect(template.blocks).toHaveLength(0);
      expect(template.variables).toHaveLength(0);
    });
  });

  describe("Version", () => {
    it("should create a version with snapshot", () => {
      const now = createTimestamp();
      const promptId = createPromptId();
      const snapshot = createPromptSnapshot({
        promptId,
        title: "Snapshot",
        blocks: [],
        variables: [],
        status: PromptStatus.Draft,
        tags: [],
      });

      const version = createVersion({
        id: createVersionId(),
        promptId,
        number: createVersionNumber(1),
        snapshot,
        createdAt: now,
      });

      expect(version.number.value).toBe(1);
      expect(version.status).toBe(VersionStatus.Draft);
      expect(version.snapshot.title).toBe("Snapshot");
    });

    it("should change version status", () => {
      const now = createTimestamp();
      const promptId = createPromptId();
      const snapshot = createPromptSnapshot({
        promptId,
        title: "Test",
        blocks: [],
        variables: [],
        status: PromptStatus.Draft,
        tags: [],
      });

      const version = createVersion({
        id: createVersionId(),
        promptId,
        number: createVersionNumber(1),
        snapshot,
        createdAt: now,
      });

      const published = changeVersionStatus(version, VersionStatus.Published);
      expect(published.status).toBe(VersionStatus.Published);
    });
  });
});
