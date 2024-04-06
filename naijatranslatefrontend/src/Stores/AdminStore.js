
import { create } from "zustand";

const useAdminStore = (set) => ({
	adminProfile: [],

	setAdminProfile: (profile) => set({ adminProfile: profile }),
});

export const useAdminDataStore = create(useAdminStore);
