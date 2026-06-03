import type { Version } from "@/domain/entities/Version";
import type { PromptId } from "@/domain/types";
import { VersionStatus } from "@/domain/types";

/**
 * VersionAggregate manages version consistency for a single prompt's version chain.
 */
export type VersionAggregate = Readonly<{
  promptId: PromptId;
  versions: readonly Version[];
}>;

export function createVersionAggregate(
  promptId: PromptId,
  versions: readonly Version[],
): VersionAggregate {
  return { promptId, versions } as const;
}

export function getLatestVersion(
  aggregate: VersionAggregate,
): Version | undefined {
  const sorted = [...aggregate.versions].sort(
    (a, b) => b.number.value - a.number.value,
  );
  return sorted[0];
}

export function getLatestPublishedVersion(
  aggregate: VersionAggregate,
): Version | undefined {
  return [...aggregate.versions]
    .filter((v) => v.status === VersionStatus.Published)
    .sort((a, b) => b.number.value - a.number.value)[0];
}

export function getVersionByNumber(
  aggregate: VersionAggregate,
  number: number,
): Version | undefined {
  return aggregate.versions.find((v) => v.number.value === number);
}
