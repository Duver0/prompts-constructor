import type { VersionId, PromptId, VersionStatus, Timestamp } from "@/domain/types";
import type { VersionNumber } from "@/domain/value-objects/VersionNumber";
import type { PromptSnapshot } from "@/domain/value-objects/PromptSnapshot";

export type Version = Readonly<{
  id: VersionId;
  promptId: PromptId;
  number: VersionNumber;
  snapshot: PromptSnapshot;
  status: VersionStatus;
  message: string | undefined;
  createdAt: Timestamp;
}>;

export type VersionUpdateParams = Partial<{
  status: VersionStatus;
  message: string;
}>;

export function createVersion(params: {
  id: VersionId;
  promptId: PromptId;
  number: VersionNumber;
  snapshot: PromptSnapshot;
  createdAt: Timestamp;
  message?: string;
}): Version {
  return {
    id: params.id,
    promptId: params.promptId,
    number: params.number,
    snapshot: params.snapshot,
    status: "Draft" as VersionStatus,
    message: params.message,
    createdAt: params.createdAt,
  } as const;
}

export function updateVersion(version: Version, params: VersionUpdateParams): Version {
  return { ...version, ...params } as const;
}

export function changeVersionStatus(version: Version, status: VersionStatus): Version {
  return { ...version, status } as const;
}
