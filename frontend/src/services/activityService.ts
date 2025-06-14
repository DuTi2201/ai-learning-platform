import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized access detected in activity service');
    }
    return Promise.reject(error);
  }
);

export interface RecentActivity {
  id: string;
  type: 'lesson_completed' | 'course_enrolled' | 'streak_achieved';
  title: string;
  description: string;
  timestamp: string;
  metadata?: {
    courseTitle?: string;
    lessonTitle?: string;
    streakDays?: number;
  };
}

export interface ActivityResponse {
  success: boolean;
  message: string;
  data: RecentActivity[];
}

export const activityService = {
  /**
   * Lấy các hoạt động gần đây của người dùng hiện tại
   */
  async getUserRecentActivities(limit: number = 10): Promise<RecentActivity[]> {
    try {
      const response = await api.get<ActivityResponse>(`/users/me/activities?limit=${limit}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user recent activities:', error);
      throw error;
    }
  },
};
