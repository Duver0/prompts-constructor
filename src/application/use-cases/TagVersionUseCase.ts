import type { Version } from "@/domain/entities/Version";
import { createNextVersion, publishVersion, archiveVersion } from "@/domain/services/VersionManager";
import type { IPromptRepository, IVersionRepository } from "@/domain/repositories";
import type { PromptId, VersionId } from "@/domain/types";

export type TagVersionInput = {
  promptId: string;
  action: "create" | "publish" | "archive";
  message?: string;
  versionId?: string;
};

export type TagVersionOutput = {
  version: Version;
};

export class TagVersionUseCase {
  constructor(
    private readonly promptRepo: IPromptRepository,
    private readonly versionRepo: IVersionRepository,
  ) {}

  execute(input: TagVersionInput): TagVersionOutput {
    const promptId = input.promptId as PromptId;
    const versionId = input.versionId as VersionId | undefined;

    const prompt = this.promptRepo.getById(promptId);
    if (!prompt) {
      throw new Error(`Prompt not found: ${input.promptId}`);
    }

    switch (input.action) {
      case "create": {
        const versions = this.versionRepo.getByPromptId(promptId);
        const latestVersion = versions.length > 0
          ? [...versions].sort((a, b) => b.number.value - a.number.value)[0]
          : undefined;

        const version = createNextVersion(latestVersion, prompt, input.message);
        this.versionRepo.save(version);
        return { version };
      }

      case "publish": {
        if (!versionId) throw new Error("versionId required for publish");
        const version = this.versionRepo.getById(versionId);
        if (!version) throw new Error(`Version not found: ${String(versionId)}`);

        const published = publishVersion(version);
        this.versionRepo.save(published);
        return { version: published };
      }

      case "archive": {
        if (!versionId) throw new Error("versionId required for archive");
        const version = this.versionRepo.getById(versionId);
        if (!version) throw new Error(`Version not found: ${String(versionId)}`);

        const archived = archiveVersion(version);
        this.versionRepo.save(archived);
        return { version: archived };
      }

      default:
        throw new Error(`Unknown action: ${String(input.action satisfies never)}`);
    }
  }
}
