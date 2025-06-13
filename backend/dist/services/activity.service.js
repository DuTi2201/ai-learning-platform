"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const database_1 = require("../config/database");
const prisma_1 = require("../generated/prisma");
class ActivityService {
    static async getUserRecentActivities(userId, limit = 10) {
        const activities = [];
        const recentCompletedLessons = await database_1.prisma.lessonProgress.findMany({
            where: {
                userId,
                status: prisma_1.LessonStatus.COMPLETED,
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
        const recentEnrollments = await database_1.prisma.enrollment.findMany({
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
        const streakInfo = await this.calculateUserStreak(userId);
        if (streakInfo.currentStreak >= 7) {
            const streakDate = new Date();
            streakDate.setDate(streakDate.getDate() - 1);
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
        return activities
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit);
    }
    static async calculateUserStreak(userId) {
        const completedLessons = await database_1.prisma.lessonProgress.findMany({
            where: {
                userId,
                status: prisma_1.LessonStatus.COMPLETED,
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
        const uniqueDays = [...new Set(completedLessons
                .map(lesson => lesson.completedAt?.toDateString())
                .filter(Boolean))].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 1;
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
        if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
            currentStreak = 1;
            for (let i = 1; i < uniqueDays.length; i++) {
                const currentDay = new Date(uniqueDays[i - 1]);
                const previousDay = new Date(uniqueDays[i]);
                const diffTime = currentDay.getTime() - previousDay.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    currentStreak++;
                }
                else {
                    break;
                }
            }
        }
        for (let i = 1; i < uniqueDays.length; i++) {
            const currentDay = new Date(uniqueDays[i - 1]);
            const previousDay = new Date(uniqueDays[i]);
            const diffTime = currentDay.getTime() - previousDay.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                tempStreak++;
            }
            else {
                longestStreak = Math.max(longestStreak, tempStreak);
                tempStreak = 1;
            }
        }
        longestStreak = Math.max(longestStreak, tempStreak);
        return { currentStreak, longestStreak };
    }
}
exports.ActivityService = ActivityService;
//# sourceMappingURL=activity.service.js.map