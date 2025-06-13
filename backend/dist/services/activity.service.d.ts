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
export declare class ActivityService {
    static getUserRecentActivities(userId: string, limit?: number): Promise<RecentActivity[]>;
    private static calculateUserStreak;
}
//# sourceMappingURL=activity.service.d.ts.map