import axios from 'axios';
import { User, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies
  timeout: 10000, // 10 second timeout
});

// Handle token expiration and other errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      // Request timeout
      console.warn('Request timeout - please check your connection');
    } else if (error.code === 'ERR_NETWORK') {
      // Network error
      console.warn('Network error - please check if the server is running');
    } else if (error.response?.status === 401) {
      // Only redirect on 401 if we're not on the login page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/auth/callback')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  async handleGoogleCallback(code: string): Promise<{ token: string; user: User }> {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/google/callback', {
      code,
    });
    return response.data.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};

export { api };
