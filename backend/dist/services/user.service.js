"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../config/database");
const types_1 = require("../types");
const types_2 = require("../types");
class UserService {
    static async getAllUsers(params) {
        const { page = 1, limit = 10, search, role } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (role) {
            where.role = role;
        }
        const [users, total] = await Promise.all([
            database_1.prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    role: true,
                    profilePictureUrl: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            enrollments: true,
                            lessonProgress: true,
                        },
                    },
                },
            }),
            database_1.prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        };
    }
    static async getUserById(userId, includePrivate = false) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: includePrivate,
                fullName: true,
                role: includePrivate,
                profilePictureUrl: true,
                createdAt: true,
                updatedAt: includePrivate,
                enrollments: {
                    select: {
                        id: true,
                        enrolledAt: true,
                        course: {
                            select: {
                                id: true,
                                courseCode: true,
                                title: true,
                                description: true,
                                thumbnail: true,
                                level: true,
                                status: true,
                            },
                        },
                    },
                    orderBy: { enrollmentDate: 'desc' },
                },
                _count: {
                    select: {
                        enrollments: true,
                        lessonProgress: true,
                    },
                },
            },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        return user;
    }
    static async getUserByEmail(email) {
        const user = await database_1.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                profilePictureUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    static async createOrUpdateUser(userData) {
        const { email, fullName, profilePictureUrl } = userData;
        const user = await database_1.prisma.user.upsert({
            where: { email },
            update: {
                fullName,
                profilePictureUrl,
                updatedAt: new Date(),
            },
            create: {
                email,
                fullName,
                profilePictureUrl,
                role: types_2.UserRole.STUDENT,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                profilePictureUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    static async updateUser(userId, data) {
        const existingUser = await database_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            throw new types_1.AppError('User not found', 404);
        }
        if (data.email && data.email !== existingUser.email) {
            const emailExists = await database_1.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (emailExists) {
                throw new types_1.AppError('User with this email already exists', 400);
            }
        }
        const user = await database_1.prisma.user.update({
            where: { id: userId },
            data: {
                ...data,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                profilePictureUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
    static async updateUserRole(userId, role) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        const updatedUser = await database_1.prisma.user.update({
            where: { id: userId },
            data: {
                role,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                profilePictureUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedUser;
    }
    static async deleteUser(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                _count: {
                    select: {
                        enrollments: true,
                        lessonProgress: true,
                    },
                },
            },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        await database_1.prisma.$transaction(async (tx) => {
            await tx.lessonProgress.deleteMany({
                where: { userId },
            });
            await tx.enrollment.deleteMany({
                where: { userId },
            });
            await tx.user.delete({
                where: { id: userId },
            });
        });
        return { message: 'User deleted successfully' };
    }
    static async getUserProgress(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        const progress = await database_1.prisma.lessonProgress.findMany({
            where: { userId },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        lessonOrder: true,
                        module: {
                            select: {
                                id: true,
                                title: true,
                                moduleOrder: true,
                                course: {
                                    select: {
                                        id: true,
                                        courseCode: true,
                                        title: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                lesson: {
                    module: {
                        course: {
                            title: 'asc',
                        },
                    },
                },
            },
        });
        return progress;
    }
    static async getUserEnrolledCourses(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        const enrollments = await database_1.prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: {
                    select: {
                        id: true,
                        courseCode: true,
                        title: true,
                        description: true,
                        modules: {
                            select: {
                                id: true,
                                lessons: {
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { enrollmentDate: 'desc' },
        });
        const coursesWithProgress = await Promise.all(enrollments.map(async (enrollment) => {
            const totalLessons = enrollment.course.modules.reduce((total, module) => total + module.lessons.length, 0);
            const completedLessons = await database_1.prisma.lessonProgress.count({
                where: {
                    userId,
                    lesson: {
                        module: {
                            courseId: enrollment.course.id,
                        },
                    },
                    status: 'COMPLETED',
                },
            });
            const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
            return {
                ...enrollment,
                course: {
                    ...enrollment.course,
                    modules: undefined,
                },
                progress: {
                    totalLessons,
                    completedLessons,
                    progressPercentage: Math.round(progressPercentage * 100) / 100,
                },
            };
        }));
        return coursesWithProgress;
    }
    static async getUserStats(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        const [enrollmentsCount, completedLessonsCount, totalProgressCount] = await Promise.all([
            database_1.prisma.enrollment.count({
                where: { userId },
            }),
            database_1.prisma.lessonProgress.count({
                where: {
                    userId,
                    status: 'COMPLETED',
                },
            }),
            database_1.prisma.lessonProgress.count({
                where: { userId },
            }),
        ]);
        return {
            user: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                profilePictureUrl: user.profilePictureUrl,
            },
            stats: {
                totalEnrollments: enrollmentsCount,
                completedLessons: completedLessonsCount,
                totalLessonsStarted: totalProgressCount,
                completionRate: totalProgressCount > 0 ? (completedLessonsCount / totalProgressCount) * 100 : 0,
            },
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map