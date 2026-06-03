import type { Prompt } from "@/domain/entities/Prompt";
import type { Version } from "@/domain/entities/Version";
import { createVersion } from "@/domain/entities/Version";
import { createPromptSnapshot } from "@/domain/value-objects/PromptSnapshot";
import { createVersionNumber, incrementVersionNumber } from "@/domain/value-objects/VersionNumber";
import { createVersionId } from "@/domain/value-objects";
import { createTimestamp } from "@/domain/value-objects/Timestamp";
import { VersionStatus } from "@/domain/types";

/**
 * Creates a new version snapshot from a prompt state.
 */
export function createVersionFromPrompt(
  prompt: Prompt,
  message?: string,
): Version {
  const snapshot = createPromptSnapshot({
    promptId: prompt.id,
    title: prompt.title,
    blocks: [...prompt.blocks],
    variables: [...prompt.variables],
    status: prompt.status,
    tags: prompt.tags.map((t) => t.value),
  });

  return createVersion({
    id: createVersionId(),
    promptId: prompt.id,
    number: createVersionNumber(1),
    snapshot,
    createdAt: createTimestamp(),
    message,
  });
}

/**
 * Creates a version with an incremented version number.
 */
export function createNextVersion(
  latestVersion: Version | undefined,
  prompt: Prompt,
  message?: string,
): Version {
  const nextNumber = latestVersion
    ? incrementVersionNumber(latestVersion.number)
    : createVersionNumber(1);

  const snapshot = createPromptSnapshot({
    promptId: prompt.id,
    title: prompt.title,
    blocks: [...prompt.blocks],
    variables: [...prompt.variables],
    status: prompt.status,
    tags: prompt.tags.map((t) => t.value),
  });

  return createVersion({
    id: createVersionId(),
    promptId: prompt.id,
    number: nextNumber,
    snapshot,
    createdAt: createTimestamp(),
    message,
  });
}

/**
 * Publishes a version (Draft → Published).
 */
export function publishVersion(version: Version): Version {
  if (version.status !== VersionStatus.Draft) {
    throw new Error(`Cannot publish version in status: ${version.status}`);
  }
  return { ...version, status: VersionStatus.Published } as const;
}

/**
 * Archives a version (Published → Archived).
 */
export function archiveVersion(version: Version): Version {
  if (version.status !== VersionStatus.Published) {
    throw new Error(`Cannot archive version in status: ${version.status}`);
  }
  return { ...version, status: VersionStatus.Archived } as const;
}
