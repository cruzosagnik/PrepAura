import api from './api';
import { MOCK_USER } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const authService = {
  login: async (credentials) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { token: 'mock_jwt_token_xyz', user: MOCK_USER };
    }
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { token: 'mock_jwt_token_xyz', user: { ...MOCK_USER, ...userData } };
    }
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    if (USE_MOCK) return MOCK_USER;
    const response = await api.get('/auth/me');
    return response.data;
  }
};