import { prisma } from '../config/database';
import { LessonStatus } from '../generated/prisma';

export interface RecentActivity {
  id: string;
  type: 'lesson_completed' | 'course_enrolled' | 'streak_achieved';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: {
    courseTitle?: string;
    lessonTitle?: string;
    streakDays?: number;
  };
}

export class ActivityService {
  /**
   * Lấy các hoạt động gần đây của người dùng
   */
  static async getUserRecentActivities(userId: string, limit: number = 10): Promise<RecentActivity[]> {
    const activities: RecentActivity[] = [];

    // 1. Lấy các bài học đã hoàn thành gần đây
    const recentCompletedLessons = await prisma.lessonProgress.findMany({
      where: {
        userId,
        status: LessonStatus.COMPLETED,
        completedAt: { not: null }
      },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      },
      take: 5
    });

    // Thêm các bài học đã hoàn thành vào activities
    recentCompletedLessons.forEach(progress => {
      if (progress.completedAt) {
        activities.push({
          id: progress.id,
          type: 'lesson_completed',
          title: `Hoàn thành bài học "${progress.lesson.title}"`,
          description: `Trong khóa học ${progress.lesson.module.course.title}`,
          timestamp: progress.completedAt,
          metadata: {
            courseTitle: progress.lesson.module.course.title,
            lessonTitle: progress.lesson.title
          }
        });
      }
    });

    // 2. Lấy các khóa học đã đăng ký gần đây
    const recentEnrollments = await prisma.enrollment.findMany({
      where: {
        userId
      },
      include: {
        course: true
      },
      orderBy: {
        enrollmentDate: 'desc'
      },
      take: 3
    });

    // Thêm các đăng ký khóa học vào activities
    recentEnrollments.forEach(enrollment => {
      activities.push({
        id: enrollment.id,
        type: 'course_enrolled',
        title: `Đăng ký khóa học "${enrollment.course.title}"`,
        description: `Bắt đầu hành trình học tập mới`,
        timestamp: enrollment.enrollmentDate,
        metadata: {
          courseTitle: enrollment.course.title
        }
      });
    });

    // 3. Tính toán streak (chuỗi học liên tiếp)
    const streakInfo = await this.calculateUserStreak(userId);
    if (streakInfo.currentStreak >= 7) {
      // Thêm achievement cho streak nếu >= 7 ngày
      const streakDate = new Date();
      streakDate.setDate(streakDate.getDate() - 1); // Giả sử đạt được streak hôm qua
      
      activities.push({
        id: `streak_${userId}_${streakInfo.currentStreak}`,
        type: 'streak_achieved',
        title: `Đạt chuỗi học ${streakInfo.currentStreak} ngày liên tiếp`,
        description: `Chúc mừng! Bạn đã duy trì thói quen học tập tuyệt vời`,
        timestamp: streakDate,
        metadata: {
          streakDays: streakInfo.currentStreak
        }
      });
    }

    // Sắp xếp theo thời gian và giới hạn số lượng
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Tính toán streak của người dùng
   */
  private static async calculateUserStreak(userId: string): Promise<{ currentStreak: number; longestStreak: number }> {
    // Lấy tất cả ngày có hoạt động học tập (hoàn thành bài học)
    const completedLessons = await prisma.lessonProgress.findMany({
      where: {
        userId,
        status: LessonStatus.COMPLETED,
        completedAt: { not: null }
      },
      select: {
        completedAt: true
      },
      orderBy: {
        completedAt: 'desc'
      }
    });

    if (completedLessons.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Chuyển đổi thành các ngày duy nhất
    const uniqueDays = [...new Set(
      completedLessons
        .map(lesson => lesson.completedAt?.toDateString())
        .filter(Boolean)
    )].sort((a, b) => new Date(b!).getTime() - new Date(a!).getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    // Kiểm tra streak hiện tại
    if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
      currentStreak = 1;
      
      for (let i = 1; i < uniqueDays.length; i++) {
        const currentDay = new Date(uniqueDays[i-1]!);
        const previousDay = new Date(uniqueDays[i]!);
        const diffTime = currentDay.getTime() - previousDay.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Tính longest streak
    for (let i = 1; i < uniqueDays.length; i++) {
      const currentDay = new Date(uniqueDays[i-1]!);
      const previousDay = new Date(uniqueDays[i]!);
      const diffTime = currentDay.getTime() - previousDay.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
  }
}
