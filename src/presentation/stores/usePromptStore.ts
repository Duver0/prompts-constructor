import { create } from "zustand";
import {
  LocalStoragePromptRepository,
  LocalStoragePromptQuery,
} from "@/infrastructure/persistence";
import type { Prompt } from "@/domain/entities/Prompt";
import type { PromptId, PromptStatus } from "@/domain/types";
import type { Block } from "@/domain/entities/Block";
import type { Variable } from "@/domain/entities/SharedTypes";
import type { Tag } from "@/domain/value-objects/Tag";
import { createPromptId, createVersionNumber, createTimestamp } from "@/domain/value-objects";
import { createPrompt, updatePrompt, changePromptStatus } from "@/domain/entities/Prompt";

const repo = new LocalStoragePromptRepository();
const query = new LocalStoragePromptQuery(repo);

export type PromptState = {
  prompts: readonly Prompt[];
  selectedPromptId: PromptId | null;
  searchQuery: string;
  loading: boolean;
};

export type PromptActions = {
  loadPrompts: () => void;
  createPromptAction: (title: string) => Prompt;
  updatePromptAction: (id: PromptId, params: { title?: string; blocks?: readonly Block[]; variables?: readonly Variable[]; tags?: readonly Tag[] }) => void;
  deletePrompt: (id: PromptId) => void;
  changeStatus: (id: PromptId, status: PromptStatus) => void;
  selectPrompt: (id: PromptId | null) => void;
  setSearchQuery: (query: string) => void;
  getPromptById: (id: PromptId) => Prompt | undefined;
  getFilteredPrompts: () => readonly Prompt[];
};

export type PromptStore = PromptState & PromptActions;

export const usePromptStore = create<PromptStore>()((set, get) => ({
  prompts: [],
  selectedPromptId: null,
  searchQuery: "",
  loading: false,

  loadPrompts: () => {
    set({ prompts: repo.getAll(), loading: false });
  },

  createPromptAction: (title: string) => {
    const now = createTimestamp();
    const prompt = createPrompt({
      id: createPromptId(),
      title,
      version: createVersionNumber(1),
      createdAt: now,
      updatedAt: now,
    });
    repo.save(prompt);
    set({ prompts: repo.getAll() });
    return prompt;
  },

  updatePromptAction: (id, params) => {
    const existing = repo.getById(id);
    if (!existing) return;

    const now = createTimestamp();
    const updated = { ...updatePrompt(existing, params), updatedAt: now } as const;
    repo.save(updated);
    set({ prompts: repo.getAll() });
  },

  deletePrompt: (id) => {
    repo.delete(id);
    set((state) => ({
      prompts: repo.getAll(),
      selectedPromptId: state.selectedPromptId === id ? null : state.selectedPromptId,
    }));
  },

  changeStatus: (id, status) => {
    const existing = repo.getById(id);
    if (!existing) return;
    const updated = changePromptStatus(existing, status);
    repo.save(updated);
    set({ prompts: repo.getAll() });
  },

  selectPrompt: (id) => { set({ selectedPromptId: id }); },

  setSearchQuery: (q) => { set({ searchQuery: q }); },

  getPromptById: (id) => get().prompts.find((p) => p.id === id),

  getFilteredPrompts: () => {
    const { prompts, searchQuery: sq } = get();
    if (!sq.trim()) return prompts;
    return query.search(sq);
  },
}));
