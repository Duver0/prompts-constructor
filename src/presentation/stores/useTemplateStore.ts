import { create } from "zustand";
import { LocalStorageTemplateRepository } from "@/infrastructure/persistence";
import type { PromptTemplate } from "@/domain/entities/PromptTemplate";
import type { TemplateId, TemplateCategory } from "@/domain/types";
import { createPromptTemplate } from "@/domain/entities/PromptTemplate";
import { createTemplateId, createVersionNumber, createTimestamp } from "@/domain/value-objects";

const repo = new LocalStorageTemplateRepository();

export type TemplateState = {
  templates: readonly PromptTemplate[];
  selectedTemplateId: TemplateId | null;
  filterCategory: TemplateCategory | "all";
  loading: boolean;
};

export type TemplateActions = {
  loadTemplates: () => void;
  createTemplateAction: (params: { name: string; description: string; category: TemplateCategory }) => PromptTemplate;
  deleteTemplate: (id: TemplateId) => void;
  selectTemplate: (id: TemplateId | null) => void;
  setFilterCategory: (cat: TemplateCategory | "all") => void;
  getTemplateById: (id: TemplateId) => PromptTemplate | undefined;
  getFilteredTemplates: () => readonly PromptTemplate[];
};

export type TemplateStore = TemplateState & TemplateActions;

export const useTemplateStore = create<TemplateStore>()((set, get) => ({
  templates: [],
  selectedTemplateId: null,
  filterCategory: "all",
  loading: false,

  loadTemplates: () => {
    set({ templates: repo.getAll(), loading: false });
  },

  createTemplateAction: (params) => {
    const now = createTimestamp();
    const template = createPromptTemplate({
      id: createTemplateId(),
      name: params.name,
      description: params.description,
      category: params.category,
      version: createVersionNumber(1),
      createdAt: now,
    });
    repo.save(template);
    set({ templates: repo.getAll() });
    return template;
  },

  deleteTemplate: (id) => {
    repo.delete(id);
    set((state) => ({
      templates: repo.getAll(),
      selectedTemplateId: state.selectedTemplateId === id ? null : state.selectedTemplateId,
    }));
  },

  selectTemplate: (id) => { set({ selectedTemplateId: id }); },
  setFilterCategory: (cat) => { set({ filterCategory: cat }); },

  getTemplateById: (id) => get().templates.find((t) => t.id === id),

  getFilteredTemplates: () => {
    const { filterCategory } = get();
    if (filterCategory === "all") return get().templates;
    return repo.getByCategory(filterCategory);
  },
}));
