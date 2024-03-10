import { create } from "zustand";

const employeeDataStore = (set) => ({
  employeeData: [],

  setEmployeeData: (data) => set({ employeeData: data }),
});

export const useEmployeeDataStore = create(employeeDataStore);

export const setEmployeeData = (data) => {
  useEmployeeDataStore.setState({ employeeData: data });
};
