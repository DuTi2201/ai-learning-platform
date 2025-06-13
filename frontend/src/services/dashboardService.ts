import api from './api';
import { User } from '../types';

export interface UserStats {
  totalEnrollments: number;
  completedLessons: number;
  totalProgress: number;
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  enrollmentDate: string;
  course: {
    id: string;
    courseCode: string;
    title: string;
    description?: string;
    createdAt: string;
  };
  progress: number;
  totalLessons: number;
  completedLessons: number;
  isEnrolled: boolean;
}

export interface DashboardData {
  user: User;
  stats: UserStats;
  enrolledCourses: EnrolledCourse[];
}

class DashboardService {
  // Get current user statistics
  async getUserStats(): Promise<UserStats> {
    const response = await api.get('/users/me/stats');
    return response.data.data;
  }

  // Get current user enrolled courses
  async getEnrolledCourses(): Promise<EnrolledCourse[]> {
    const response = await api.get('/users/me/courses');
    return response.data.data;
  }

  // Get all dashboard data in one call
  async getDashboardData(): Promise<DashboardData> {
    try {
      const [statsResponse, coursesResponse, userResponse] = await Promise.all([
        api.get('/users/me/stats'),
        api.get('/users/me/courses'),
        api.get('/auth/me')
      ]);

      return {
        user: userResponse.data.data,
        stats: statsResponse.data.data,
        enrolledCourses: coursesResponse.data.data
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
}

export default new DashboardService();
