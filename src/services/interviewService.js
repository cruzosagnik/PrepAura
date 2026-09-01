import api from './api';
import { MOCK_QUESTIONS, MOCK_RESULT, MOCK_INTERVIEW_HISTORY, MOCK_STATS, MOCK_SCORE_TREND, MOCK_SKILL_ANALYSIS } from '../utils/mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export const interviewService = {
  getDashboardData: async () => {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return {
        stats: MOCK_STATS,
        scoreTrend: MOCK_SCORE_TREND,
        skillAnalysis: MOCK_SKILL_ANALYSIS,
        recentInterviews: MOCK_INTERVIEW_HISTORY.slice(0, 3)
      };
    }
    const response = await api.get('/dashboard');
    return response.data;
  },

  startInterview: async (config) => {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 500));
      return {
        interviewId: 'int_' + Date.now(),
        config,
        questions: MOCK_QUESTIONS.slice(0, config.questionCount || 5)
      };
    }
    const response = await api.post('/interviews/start', config);
    return response.data;
  },

  submitAnswer: async (interviewId, payload) => {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 400));
      return { success: true };
    }
    const response = await api.post(`/interviews/${interviewId}/answer`, payload);
    return response.data;
  },

  completeInterview: async (interviewId) => {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 800));
      return MOCK_RESULT;
    }
    const response = await api.post(`/interviews/${interviewId}/complete`);
    return response.data;
  },

  getInterviewResult: async (id) => {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return MOCK_RESULT;
    }
    const response = await api.get(`/interviews/${id}/result`);
    return response.data;
  },

  getHistory: async () => {
    if (USE_MOCK) {
      await new Promise((res) => setTimeout(res, 300));
      return MOCK_INTERVIEW_HISTORY;
    }
    const response = await api.get('/interviews/history');
    return response.data;
  }
};