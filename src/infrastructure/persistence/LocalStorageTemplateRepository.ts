import type { PromptTemplate } from "@/domain/entities/PromptTemplate";
import type { TemplateId, TemplateCategory } from "@/domain/types";
import type { ITemplateRepository } from "@/domain/repositories";
import { readFromStorage, writeToStorage } from "./storage";

const STORAGE_KEY = "templates";

export class LocalStorageTemplateRepository implements ITemplateRepository {
  private loadAll(): Map<string, PromptTemplate> {
    const raw = readFromStorage<Record<string, PromptTemplate>>(STORAGE_KEY);
    if (!raw) return new Map();
    return new Map(Object.entries(raw));
  }

  private saveAll(map: Map<string, PromptTemplate>): void {
    const obj: Record<string, PromptTemplate> = {};
    for (const [key, value] of map) {
      obj[key] = value;
    }
    writeToStorage(STORAGE_KEY, obj);
  }

  getById(id: TemplateId): PromptTemplate | undefined {
    const map = this.loadAll();
    return map.get(id);
  }

  getAll(): readonly PromptTemplate[] {
    const map = this.loadAll();
    return Array.from(map.values());
  }

  getByCategory(category: TemplateCategory): readonly PromptTemplate[] {
    const map = this.loadAll();
    return Array.from(map.values()).filter((t) => t.category === category);
  }

  save(template: PromptTemplate): void {
    const map = this.loadAll();
    map.set(template.id, template);
    this.saveAll(map);
  }

  delete(id: TemplateId): void {
    const map = this.loadAll();
    map.delete(id);
    this.saveAll(map);
  }
}
