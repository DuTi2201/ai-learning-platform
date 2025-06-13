import axios from 'axios';
import { Resource, CreateResourceRequest, ApiResponse } from '../types';

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

export const resourceService = {
  async createResource(resourceData: CreateResourceRequest): Promise<Resource> {
    const response = await api.post<ApiResponse<Resource>>('/resources', resourceData);
    return response.data.data;
  },

  async updateResource(id: string, resourceData: Partial<CreateResourceRequest>): Promise<Resource> {
    const response = await api.put<ApiResponse<Resource>>(`/resources/${id}`, resourceData);
    return response.data.data;
  },

  async deleteResource(id: string): Promise<void> {
    await api.delete(`/resources/${id}`);
  },
};