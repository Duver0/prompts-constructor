import type {
  PromptId,
  BlockId,
  BlockType,
  TemplateId,
  TemplateCategory,
  ExportFormat,
} from "@/domain/types";
import type { VersionNumber } from "@/domain/value-objects/VersionNumber";

export type PromptCreatedEvent = {
  type: "PromptCreated";
  payload: {
    promptId: PromptId;
    title: string;
    timestamp: Date;
  };
};

export type PromptUpdatedEvent = {
  type: "PromptUpdated";
  payload: {
    promptId: PromptId;
    versionNumber: VersionNumber;
    timestamp: Date;
  };
};

export type PromptDeletedEvent = {
  type: "PromptDeleted";
  payload: {
    promptId: PromptId;
    timestamp: Date;
  };
};

export type PromptRestoredEvent = {
  type: "PromptRestored";
  payload: {
    promptId: PromptId;
    timestamp: Date;
  };
};

export type BlockAddedEvent = {
  type: "BlockAdded";
  payload: {
    promptId: PromptId;
    blockId: BlockId;
    blockType: BlockType;
    order: number;
  };
};

export type BlockRemovedEvent = {
  type: "BlockRemoved";
  payload: {
    promptId: PromptId;
    blockId: BlockId;
    blockType: BlockType;
  };
};

export type BlockReorderedEvent = {
  type: "BlockReordered";
  payload: {
    promptId: PromptId;
    blockId: BlockId;
    oldOrder: number;
    newOrder: number;
  };
};

export type VersionTaggedEvent = {
  type: "VersionTagged";
  payload: {
    promptId: PromptId;
    versionNumber: VersionNumber;
    status: string;
  };
};

export type VersionRolledBackEvent = {
  type: "VersionRolledBack";
  payload: {
    promptId: PromptId;
    fromVersion: VersionNumber;
    toVersion: VersionNumber;
  };
};

export type TemplateCreatedEvent = {
  type: "TemplateCreated";
  payload: {
    templateId: TemplateId;
    name: string;
    category: TemplateCategory;
  };
};

export type TemplateAppliedEvent = {
  type: "TemplateApplied";
  payload: {
    templateId: TemplateId;
    promptId: PromptId;
  };
};

export type PromptExportedEvent = {
  type: "PromptExported";
  payload: {
    promptId: PromptId;
    format: ExportFormat;
    tokenCount: number;
  };
};

export type DomainEvent =
  | PromptCreatedEvent
  | PromptUpdatedEvent
  | PromptDeletedEvent
  | PromptRestoredEvent
  | BlockAddedEvent
  | BlockRemovedEvent
  | BlockReorderedEvent
  | VersionTaggedEvent
  | VersionRolledBackEvent
  | TemplateCreatedEvent
  | TemplateAppliedEvent
  | PromptExportedEvent;
