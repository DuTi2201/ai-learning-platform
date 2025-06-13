import axios from 'axios';
import { Module, CreateModuleRequest, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const moduleService = {
  async createModule(moduleData: CreateModuleRequest): Promise<Module> {
    const response = await api.post<ApiResponse<Module>>('/modules', moduleData);
    return response.data.data;
  },

  async updateModule(id: string, moduleData: Partial<CreateModuleRequest>): Promise<Module> {
    const response = await api.put<ApiResponse<Module>>(`/modules/${id}`, moduleData);
    return response.data.data;
  },

  async deleteModule(id: string): Promise<void> {
    await api.delete(`/modules/${id}`);
  },
};