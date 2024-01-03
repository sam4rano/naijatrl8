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
  setIsLogOut: (value) => set({ isLogOut: value }),
});

const openNavbar = (set) => ({
  openNav: false,
  setOpenNav: (value) => set({ isLogOut: value }),
});

const ratingStore = (set) => ({
  ratingParams: {
    id: "",
    rating: 0,
    feedback: "",
    correct_translation: "",
    is_rated: false,
  },
  setRatingParams: (params) => set({ ratingParams: params }),
});

const ratingStoreUnverified = (set) => ({
  ratingParams: {
    rating: 0,
    feedback: "",
    correct_translation: "",
    is_rated: false,
  },
  setRatingParams: (params) => set({ ratingParams: params }),
});
export const useRatingStoreUnverified = create(ratingStoreUnverified);
export const useLogin = create(logAuth);
export const useOpenNavbar = create(openNavbar);
export const useBarStore = create(barStore);
export const useDataStore = create(allHistory);
export const useRatingStore = create(ratingStore);
