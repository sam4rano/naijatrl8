import { create } from "zustand";

const barStore = (set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
});
const allHistory = (set) => ({
  getUserHistory: (data) => set({ userHistory: data }),
});

const logAuth = (set) => ({
  isLogOut: false,
  setIsLogOut: (value) => set({ isLogOut: value })
})
export const useLogin = create(logAuth)
export const useBarStore = create(barStore);
export const useDataStore = create(allHistory);
