import type { Prompt } from "@/domain/entities/Prompt";
import type { PromptStatus } from "@/domain/types";
import type { IPromptQuery, SortDirection } from "@/domain/repositories/IPromptQuery";
import type { IPromptRepository } from "@/domain/repositories";

/**
 * In-memory query implementation that delegates read operations
 * to the prompt repository and applies filters/sorts in memory.
 */
export class LocalStoragePromptQuery implements IPromptQuery {
  constructor(private readonly repo: IPromptRepository) {}

  search(query: string): readonly Prompt[] {
    const lower = query.toLowerCase();
    return this.repo
      .getAll()
      .filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.blocks.some((b) => b.title.toLowerCase().includes(lower)),
      );
  }

  filterByStatus(status: PromptStatus): readonly Prompt[] {
    return this.repo.getAll().filter((p) => p.status === status);
  }

  filterByTag(tag: string): readonly Prompt[] {
    const lower = tag.toLowerCase();
    return this.repo.getAll().filter((p) => p.tags.some((t) => t.value.toLowerCase() === lower));
  }

  sortByDate(direction: SortDirection): readonly Prompt[] {
    return [...this.repo.getAll()].sort((a, b) => {
      const diff = a.createdAt.value.getTime() - b.createdAt.value.getTime();
      return direction === "asc" ? diff : -diff;
    });
  }
}
