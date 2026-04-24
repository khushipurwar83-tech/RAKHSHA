import * as Location from 'expo-location';
import socket from './socket';

export const locationTracker = {
  trackingInterval: null,

  startLiveTracking: async (userId) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      // Start interval to send location every 10 seconds
      locationTracker.trackingInterval = setInterval(async () => {
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        
        socket.emit('update_location', {
          user_id: userId,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: new Date()
        });
      }, 10000);

    } catch (error) {
      console.error('Tracking Error:', error);
    }
  },

  stopLiveTracking: () => {
    if (locationTracker.trackingInterval) {
      clearInterval(locationTracker.trackingInterval);
      locationTracker.trackingInterval = null;
    }
  }
};