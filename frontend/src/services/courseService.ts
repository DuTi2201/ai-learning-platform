import axios from 'axios';
import { Course, CreateCourseRequest, ApiResponse, PaginatedResponse, QueryParams, Module } from '../types';

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

export const courseService = {
  async getAllCourses(params?: QueryParams): Promise<PaginatedResponse<Course>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const response = await api.get<PaginatedResponse<Course>>(`/courses?${queryParams.toString()}`);
    return response.data;
  },

  async getCourseById(id: string): Promise<Course> {
    const response = await api.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data.data;
  },

  async createCourse(courseData: CreateCourseRequest): Promise<Course> {
    const response = await api.post<ApiResponse<Course>>('/courses', courseData);
    return response.data.data;
  },

  async updateCourse(id: string, courseData: Partial<CreateCourseRequest>): Promise<Course> {
    const response = await api.put<ApiResponse<Course>>(`/courses/${id}`, courseData);
    return response.data.data;
  },

  async deleteCourse(id: string): Promise<void> {
    await api.delete(`/courses/${id}`);
  },

  async getCourseModules(courseId: string): Promise<Module[]> {
    const response = await api.get<ApiResponse<Module[]>>(`/v1/courses/${courseId}/modules`);
    return response.data.data;
  },
};