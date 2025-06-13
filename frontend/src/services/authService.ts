import axios from 'axios';
import { User, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Let AuthContext handle the redirect
      console.log('Unauthorized access detected');
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
