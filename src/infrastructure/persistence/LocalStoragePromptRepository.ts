import type { Prompt } from "@/domain/entities/Prompt";
import type { PromptId } from "@/domain/types";
import type { IPromptRepository } from "@/domain/repositories";
import { readFromStorage, writeToStorage } from "./storage";

const STORAGE_KEY = "prompts";

export class LocalStoragePromptRepository implements IPromptRepository {
  private loadAll(): Map<string, Prompt> {
    const raw = readFromStorage<Record<string, Prompt>>(STORAGE_KEY);
    if (!raw) return new Map();
    return new Map(Object.entries(raw));
  }

  private saveAll(map: Map<string, Prompt>): void {
    const obj: Record<string, Prompt> = {};
    for (const [key, value] of map) {
      obj[key] = value;
    }
    writeToStorage(STORAGE_KEY, obj);
  }

  getById(id: PromptId): Prompt | undefined {
    const map = this.loadAll();
    return map.get(id);
  }

  getAll(): readonly Prompt[] {
    const map = this.loadAll();
    return Array.from(map.values());
  }

  save(prompt: Prompt): void {
    const map = this.loadAll();
    map.set(prompt.id, prompt);
    this.saveAll(map);
  }

  delete(id: PromptId): void {
    const map = this.loadAll();
    map.delete(id);
    this.saveAll(map);
  }
}
