import { create } from 'zustand';

export const useKanbanStore = create((set) => ({
    draggingCard: null,
    setDraggingCard: (cardId) => set({draggingCard: cardId})
}))