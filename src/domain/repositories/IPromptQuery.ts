import type { Prompt } from "@/domain/entities/Prompt";
import type { PromptStatus } from "@/domain/types";

export type SortDirection = "asc" | "desc";

export interface IPromptQuery {
  search(query: string): readonly Prompt[];
  filterByStatus(status: PromptStatus): readonly Prompt[];
  filterByTag(tag: string): readonly Prompt[];
  sortByDate(direction: SortDirection): readonly Prompt[];
}
