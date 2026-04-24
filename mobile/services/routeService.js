import api from './api';

export const routeService = {
  getSafestRoute: async (start, end) => {
    try {
      const response = await api.get('/routes/plan', {
        params: {
          start_lat: start.latitude,
          start_lng: start.longitude,
          end_lat: end.latitude,
          end_lng: end.longitude
        }
      });
      return response.data;
    } catch (error) {
      console.error('Route Planning Error:', error);
      throw error;
    }
  }
};
