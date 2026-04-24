import api from './api';

export const heatmapService = {
  getHeatmapData: async () => {
    try {
      const response = await api.get('/heatmap/data');
      return response.data;
    } catch (error) {
      console.error('Heatmap Data Error:', error);
      return [];
    }
  }
};
