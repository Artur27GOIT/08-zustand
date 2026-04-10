import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialDraft: {
  title: string;
  content: string;
  tag: string;
} = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteDraftState {
  draft: {
    title: string;
    content: string;
    tag: string;
  };
  setDraft: (note: Partial<NoteDraftState["draft"]>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteDraftState>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    },
  ),
);
