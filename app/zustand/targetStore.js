import { create } from "zustand";

export const useTargetStore = create((set) => ({
    deletingCard: null,
    setDeletingCard: (uuid) => set({deletingCard: uuid})
}))