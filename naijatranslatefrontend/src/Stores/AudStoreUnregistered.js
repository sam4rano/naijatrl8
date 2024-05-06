import { create } from "zustand";

const audioDataStore = (set) => ({
  audioData: {},

  setAudioData: (data) => set({ audioData: data }),
});

export const useAudioDataStore = create(audioDataStore);
