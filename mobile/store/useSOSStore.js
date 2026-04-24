import { create } from 'zustand';

export const useSOSStore = create((set) => ({
  isSOSActive: false,
  sosStartTime: null,
  activateSOS: () => set({ isSOSActive: true, sosStartTime: new Date() }),
  deactivateSOS: () => set({ isSOSActive: false, sosStartTime: null }),
  fakeCallActive: false,
  setFakeCall: (status) => set({ fakeCallActive: status }),
  silentAlertActive: false,
  setSilentAlert: (status) => set({ silentAlertActive: status })
}));
