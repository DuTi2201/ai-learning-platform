import axios from 'axios';
import { Lesson, CreateLessonRequest, ApiResponse } from '../types';

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
      console.log('Unauthorized access detected in lesson service');
    }
    return Promise.reject(error);
  }
);

export const lessonService = {
  async createLesson(lessonData: CreateLessonRequest): Promise<Lesson> {
    const response = await api.post<ApiResponse<Lesson>>('/lessons', lessonData);
    return response.data.data;
  },

  async updateLesson(id: string, lessonData: Partial<CreateLessonRequest>): Promise<Lesson> {
    const response = await api.put<ApiResponse<Lesson>>(`/lessons/${id}`, lessonData);
    return response.data.data;
  },

  async deleteLesson(id: string): Promise<void> {
    await api.delete(`/lessons/${id}`);
  },

  async getLessonById(id: string): Promise<Lesson> {
    const response = await api.get<ApiResponse<Lesson>>(`/lessons/${id}`);
    return response.data.data;
  },

  async getRecentLessons(): Promise<Lesson[]> {
    const response = await api.get<ApiResponse<Lesson[]>>('/lessons/recent');
    return response.data.data;
  },

  async getAllLessons(): Promise<Lesson[]> {
    const response = await api.get<ApiResponse<Lesson[]>>('/lessons');
    return response.data.data;
  },
};