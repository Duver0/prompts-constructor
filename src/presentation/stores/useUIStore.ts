import { create } from "zustand";

export type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
};

export type UIState = {
  sidebarOpen: boolean;
  toasts: readonly Toast[];
  confirmDialog: {
    open: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
  };
  activeModal: string | null;
};

export type UIActions = {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  showConfirm: (title: string, message: string, onConfirm: () => void) => void;
  closeConfirm: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
};

export type UIStore = UIState & UIActions;

let toastCounter = 0;

export const useUIStore = create<UIStore>()((set) => ({
  sidebarOpen: true,
  toasts: [],
  confirmDialog: {
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  },
  activeModal: null,

  toggleSidebar: () => { set((state) => ({ sidebarOpen: !state.sidebarOpen })); },

  setSidebarOpen: (open) => { set({ sidebarOpen: open }); },

  addToast: (toast) => {
    const id = `toast-${String(++toastCounter)}-${String(Date.now())}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
  },

  dismissToast: (id) =>
    { set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })); },

  showConfirm: (title, message, onConfirm) =>
    { set({ confirmDialog: { open: true, title, message, onConfirm } }); },

  closeConfirm: () =>
    { set({
      confirmDialog: { open: false, title: "", message: "", onConfirm: null },
    }); },

  openModal: (id) => { set({ activeModal: id }); },

  closeModal: () => { set({ activeModal: null }); },
}));
