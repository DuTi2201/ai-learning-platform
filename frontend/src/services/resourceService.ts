import axios from 'axios';
import { Resource, CreateResourceRequest, ApiResponse } from '../types';

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
      console.log('Unauthorized access detected in resource service');
    }
    return Promise.reject(error);
  }
);

export const resourceService = {
  async createResource(resourceData: CreateResourceRequest): Promise<Resource> {
    const response = await api.post<ApiResponse<Resource>>('/resources', resourceData);
    return response.data.data;
  },

  async bulkCreateResources(lessonId: string, resources: CreateResourceRequest[]): Promise<Resource[]> {
    const response = await api.post<ApiResponse<Resource[]>>(`/resources/lesson/${lessonId}/bulk`, {
      resources
    });
    return response.data.data;
  },

  async updateResource(id: string, resourceData: Partial<CreateResourceRequest>): Promise<Resource> {
    const response = await api.put<ApiResponse<Resource>>(`/resources/${id}`, resourceData);
    return response.data.data;
  },

  async deleteResource(id: string): Promise<void> {
    await api.delete(`/resources/${id}`);
  },

  async getResourceById(id: string): Promise<Resource> {
    const response = await api.get<ApiResponse<Resource>>(`/resources/${id}`);
    return response.data.data;
  },

  async getResourcesByLessonId(lessonId: string): Promise<Resource[]> {
    const response = await api.get<ApiResponse<Resource[]>>(`/resources/lesson/${lessonId}`);
    return response.data.data;
  },
};