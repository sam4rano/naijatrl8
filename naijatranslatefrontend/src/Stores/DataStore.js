import { create } from "zustand";

const employeeDataStore = (set) => ({
  employeeData: [],

  setEmployeeData: (data) => set({ employeeData: data }),
});

export const useEmployeeDataStore = create(employeeDataStore);