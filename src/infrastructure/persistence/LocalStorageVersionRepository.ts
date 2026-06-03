import type { Version } from "@/domain/entities/Version";
import type { VersionId, PromptId } from "@/domain/types";
import type { IVersionRepository } from "@/domain/repositories";
import { readFromStorage, writeToStorage } from "./storage";

const STORAGE_KEY = "versions";

export class LocalStorageVersionRepository implements IVersionRepository {
  private loadAll(): Map<string, Version> {
    const raw = readFromStorage<Record<string, Version>>(STORAGE_KEY);
    if (!raw) return new Map();
    return new Map(Object.entries(raw));
  }

  private saveAll(map: Map<string, Version>): void {
    const obj: Record<string, Version> = {};
    for (const [key, value] of map) {
      obj[key] = value;
    }
    writeToStorage(STORAGE_KEY, obj);
  }

  getById(id: VersionId): Version | undefined {
    const map = this.loadAll();
    return map.get(id);
  }

  getByPromptId(promptId: PromptId): readonly Version[] {
    const map = this.loadAll();
    return Array.from(map.values()).filter((v) => v.promptId === promptId);
  }

  save(version: Version): void {
    const map = this.loadAll();
    map.set(version.id, version);
    this.saveAll(map);
  }

  delete(id: VersionId): void {
    const map = this.loadAll();
    map.delete(id);
    this.saveAll(map);
  }
}
