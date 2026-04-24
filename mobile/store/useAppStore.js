import { create } from 'zustand';

export const useAppStore = create((set) => ({
  isOffline: false,
  setOfflineMode: (status) => set({ isOffline: status }),
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  isStealthMode: false,
  toggleStealthMode: () => set((state) => ({ isStealthMode: !state.isStealthMode })),
  theme: 'dark',
}));
