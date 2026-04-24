import { create } from 'zustand';

export const useStealthStore = create((set) => ({
  isStealthEnabled: false,
  stealthPin: '1234', // Default secret PIN
  currentMode: 'NORMAL', // NORMAL or STEALTH
  
  toggleStealth: (status) => set({ isStealthEnabled: status }),
  setStealthPin: (pin) => set({ stealthPin: pin }),
  setMode: (mode) => set({ currentMode: mode }),
}));
