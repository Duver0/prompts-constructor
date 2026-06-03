import type { VersionNumber } from "@/domain/value-objects/VersionNumber";
import type { Version } from "@/domain/entities/Version";
import { VersionStatus } from "@/domain/types";

/**
 * Ensures version numbers increment sequentially.
 */
export function validateVersionIncrement(
  current: VersionNumber,
  next: VersionNumber,
): boolean {
  return next.value === current.value + 1;
}

/**
 * Finds the latest published version for a set of versions.
 */
export function findLatestPublishedVersion(
  versions: readonly Version[],
): Version | undefined {
  const sorted = [...versions].sort((a, b) => b.number.value - a.number.value);
  return sorted.find((v) => v.status === VersionStatus.Published);
}

/**
 * Checks if a prompt has an active draft version.
 */
export function hasActiveDraft(versions: readonly Version[]): boolean {
  return versions.some((v) => v.status === VersionStatus.Draft);
}

/**
 * Validates that only one active draft exists per prompt.
 */
export function validateSingleActiveDraft(versions: readonly Version[]): string | undefined {
  const drafts = versions.filter((v) => v.status === VersionStatus.Draft);
  if (drafts.length > 1) {
    return "Only one active draft version is allowed per prompt";
  }
  return undefined;
}
