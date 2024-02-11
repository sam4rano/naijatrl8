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


const feedbackData = (set) => ({
  feedbackID: null,
  setFeedbackID: (value) => set({ feedbackID: value }),
});

const ratingStore = (set) => ({
  ratingParams: {
    id: "",
    rating: 0,
    feedback: "",
    correct_translation: "",
  },
  setRatingParams: (params) => set({ ratingParams: params }),
});

const ratingStoreUnverified = (set) => ({
  ratingParamsUnverified: {
    id: "",
    rating: 0,
    feedback: "",
    correct_translation: "",
  },
  setRatingParamsUnverified: (params) => set({ ratingParamsUnverified: params }),
});

const adminStore = (set) => ({
  isAdmin: false,
  setIsAdmin: (value) => set({ isAdmin: value }),
});

export const useAdminStore = create(adminStore);
export const useRatingStoreUnverified = create(ratingStoreUnverified);
export const useLogin = create(logAuth);
export const useFeedBackData = create(feedbackData);
export const useOpenNavbar = create(openNavbar);
export const useBarStore = create(barStore);
export const useDataStore = create(allHistory);
export const useRatingStore = create(ratingStore);
