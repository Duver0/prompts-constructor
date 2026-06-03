import type { Version } from "@/domain/entities/Version";
import type { VersionId, PromptId } from "@/domain/types";

export interface IVersionRepository {
  getById(id: VersionId): Version | undefined;
  getByPromptId(promptId: PromptId): readonly Version[];
  save(version: Version): void;
  delete(id: VersionId): void;
}
