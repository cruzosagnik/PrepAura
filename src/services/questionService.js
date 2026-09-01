import api from './api';
import { MOCK_QUESTIONS } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const questionService = {
  getQuestions: async (filters = {}) => {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return MOCK_QUESTIONS;
    }
    const response = await api.get('/questions', { params: filters });
    return response.data;
  }
};