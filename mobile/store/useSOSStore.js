import { create } from 'zustand';
import { sosService } from '../services/sosService';

export const useSOSStore = create((set, get) => ({
  isSOSActive: false,
  sosId: null,
  sosStartTime: null,
  loading: false,
  error: null,

  activateSOS: async () => {
    set({ loading: true, error: null });
    try {
      const result = await sosService.triggerSOS();
      set({ 
        isSOSActive: true, 
        sosId: result.sos_id,
        sosStartTime: new Date(),
        loading: false 
      });
    } catch (err) {
      set({ error: err.message, loading: false });
      alert("Failed to trigger SOS: " + err.message);
    }
  },

  deactivateSOS: async () => {
    const { sosId } = get();
    set({ loading: true });
    try {
      if (sosId) {
        await sosService.cancelSOS(sosId);
      }
      set({ isSOSActive: false, sosId: null, sosStartTime: null, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fakeCallActive: false,
  setFakeCall: (status) => set({ fakeCallActive: status }),
  silentAlertActive: false,
  setSilentAlert: (status) => set({ silentAlertActive: status })
}));
