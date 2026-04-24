import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://rakhsha-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;