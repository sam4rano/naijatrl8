import { create } from "zustand";

const barStore = (set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
});
const allHistory = (set) => ({
  getUserHistory: (data) => set({ userHistory: data }),
});

export const useBarStore = create(barStore);
export const useDataStore = create(allHistory);
