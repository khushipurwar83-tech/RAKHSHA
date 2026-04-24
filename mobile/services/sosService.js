import api from './api';
import * as Location from 'expo-location';

export const sosService = {
  triggerSOS: async () => {
    try {
      // 1. Get current location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      
      const payload = {
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      };

      // 2. Call backend
      const response = await api.post('/sos/trigger', payload);
      return response.data;
    } catch (error) {
      console.error('SOS Trigger Error:', error);
      throw error;
    }
  },

  cancelSOS: async (sosId) => {
    try {
      const response = await api.post('/sos/cancel', { sos_id: sosId });
      return response.data;
    } catch (error) {
      console.error('SOS Cancel Error:', error);
      throw error;
    }
  }
};
