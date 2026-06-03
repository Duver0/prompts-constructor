import { create } from "zustand";
import type { BlockId } from "@/domain/types";

export type DragState = {
  dragging: boolean;
  draggedBlockId: BlockId | null;
  targetBlockId: BlockId | null;
  dropPosition: "before" | "after" | null;
};

export type EditorState = {
  activeBlockId: BlockId | null;
  dirty: boolean;
  lastSaved: Date | null;
  drag: DragState;
  activeTab: "blocks" | "variables" | "settings";
};

export type EditorActions = {
  setActiveBlock: (id: BlockId | null) => void;
  setDirty: (dirty: boolean) => void;
  setLastSaved: (date: Date) => void;
  startDrag: (blockId: BlockId) => void;
  updateDrag: (targetBlockId: BlockId, position: "before" | "after") => void;
  endDrag: () => void;
  setActiveTab: (tab: "blocks" | "variables" | "settings") => void;
};

export type EditorStore = EditorState & EditorActions;

export const useEditorStore = create<EditorStore>()((set) => ({
  activeBlockId: null,
  dirty: false,
  lastSaved: null,
  drag: {
    dragging: false,
    draggedBlockId: null,
    targetBlockId: null,
    dropPosition: null,
  },
  activeTab: "blocks",

  setActiveBlock: (id) => { set({ activeBlockId: id }); },
  setDirty: (dirty) => { set({ dirty }); },
  setLastSaved: (date) => { set({ lastSaved: date }); },

  startDrag: (blockId) =>
    { set({
      drag: {
        dragging: true,
        draggedBlockId: blockId,
        targetBlockId: null,
        dropPosition: null,
      },
    }); },

  updateDrag: (targetBlockId, position) =>
    { set((state) => ({
      drag: { ...state.drag, targetBlockId, dropPosition: position },
    })); },

  endDrag: () =>
    { set({
      drag: {
        dragging: false,
        draggedBlockId: null,
        targetBlockId: null,
        dropPosition: null,
      },
    }); },

  setActiveTab: (tab) => { set({ activeTab: tab }); },
}));
