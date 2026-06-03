import { create } from "zustand";
import { LocalStorageVersionRepository } from "@/infrastructure/persistence";
import type { Version } from "@/domain/entities/Version";
import type { PromptId, VersionId } from "@/domain/types";
import { createNextVersion, publishVersion, archiveVersion } from "@/domain/services/VersionManager";
import type { Prompt } from "@/domain/entities/Prompt";

const repo = new LocalStorageVersionRepository();

export type VersionState = {
  versions: readonly Version[];
  selectedVersionId: VersionId | null;
  loading: boolean;
};

export type VersionActions = {
  loadVersions: (promptId: PromptId) => void;
  createVersionAction: (prompt: Prompt, message?: string) => Version;
  publishVersionAction: (id: VersionId) => void;
  archiveVersionAction: (id: VersionId) => void;
  deleteVersion: (id: VersionId) => void;
  selectVersion: (id: VersionId | null) => void;
  getVersionById: (id: VersionId) => Version | undefined;
};

export type VersionStore = VersionState & VersionActions;

export const useVersionStore = create<VersionStore>()((set, get) => ({
  versions: [],
  selectedVersionId: null,
  loading: false,

  loadVersions: (promptId) => {
    set({ versions: repo.getByPromptId(promptId), loading: false });
  },

  createVersionAction: (prompt, message) => {
    const existingVersions = repo.getByPromptId(prompt.id);
    const latest = existingVersions.length > 0
      ? [...existingVersions].sort((a, b) => b.number.value - a.number.value)[0]
      : undefined;

    const version = createNextVersion(latest, prompt, message);
    repo.save(version);
    set({ versions: repo.getByPromptId(prompt.id) });
    return version;
  },

  publishVersionAction: (id) => {
    const version = repo.getById(id);
    if (!version) return;
    const published = publishVersion(version);
    repo.save(published);
    set({ versions: repo.getByPromptId(published.promptId) });
  },

  archiveVersionAction: (id) => {
    const version = repo.getById(id);
    if (!version) return;
    const archived = archiveVersion(version);
    repo.save(archived);
    set({ versions: repo.getByPromptId(archived.promptId) });
  },

  deleteVersion: (id) => {
    const version = repo.getById(id);
    if (!version) return;
    repo.delete(id);
    set((state) => ({
      versions: repo.getByPromptId(version.promptId),
      selectedVersionId: state.selectedVersionId === id ? null : state.selectedVersionId,
    }));
  },

  selectVersion: (id) => { set({ selectedVersionId: id }); },

  getVersionById: (id) => get().versions.find((v) => v.id === id),
}));
