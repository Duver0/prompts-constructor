import { create } from "zustand";
import { ExportFormat } from "@/domain/types";
import type { ExportResult } from "@/domain/value-objects/ExportResult";

export type ExportState = {
  selectedFormat: ExportFormat;
  variableValues: Record<string, string>;
  lastExport: ExportResult | null;
  exporting: boolean;
};

export type ExportActions = {
  setFormat: (format: ExportFormat) => void;
  setVariableValue: (name: string, value: string) => void;
  setVariableValues: (values: Record<string, string>) => void;
  setLastExport: (result: ExportResult | null) => void;
  setExporting: (exporting: boolean) => void;
  reset: () => void;
};

export type ExportStore = ExportState & ExportActions;

const initialState: ExportState = {
  selectedFormat: ExportFormat.ChatGPT,
  variableValues: {},
  lastExport: null,
  exporting: false,
};

export const useExportStore = create<ExportStore>()((set) => ({
  ...initialState,

  setFormat: (format) => { set({ selectedFormat: format }); },

  setVariableValue: (name, value) =>
    { set((state) => ({
      variableValues: { ...state.variableValues, [name]: value },
    })); },

  setVariableValues: (values) => { set({ variableValues: { ...values } }); },

  setLastExport: (result) => { set({ lastExport: result }); },

  setExporting: (exporting) => { set({ exporting }); },

  reset: () => { set({ ...initialState }); },
}));
