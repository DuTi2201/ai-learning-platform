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
        const [usersWithCounts, total] = await Promise.all([
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
                    _count: {
                        select: {
                            enrollments: true,
                            lessonProgress: { where: { status: 'COMPLETED' } },
                        },
                    },
                },
            }),
            database_1.prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Users retrieved successfully',
            data: usersWithCounts,
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
        let includeOptions = {};
        if (includePrivate) {
            includeOptions = {
                enrollments: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                title: true,
                                courseCode: true,
                            },
                        },
                    },
                    orderBy: { enrollment_date: 'desc' },
                },
            };
        }
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            include: Object.keys(includeOptions).length > 0 ? includeOptions : undefined,
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
            },
        });
        return user;
    }
    static async createOrUpdateUser(userData) {
        const { email, fullName, profilePictureUrl, googleId } = userData;
        const user = await database_1.prisma.user.upsert({
            where: { email },
            update: {
                fullName,
                profilePictureUrl,
            },
            create: {
                email,
                fullName,
                profilePictureUrl,
                googleId,
                role: types_2.UserRole.USER,
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
            const emailExists = await database_1.prisma.user.findFirst({
                where: {
                    email: data.email,
                    id: { not: userId },
                },
            });
            if (emailExists) {
                throw new types_1.AppError('Another user with this email already exists', 400);
            }
        }
        const user = await database_1.prisma.user.update({
            where: { id: userId },
            data: {
                ...data,
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
        const result = await database_1.prisma.$transaction(async (tx) => {
            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: {
                    role,
                },
            });
            if (role === types_2.UserRole.INSTRUCTOR) {
                const existingInstructor = await tx.instructor.findFirst({
                    where: { fullName: user.fullName },
                });
                if (!existingInstructor) {
                    await tx.instructor.create({
                        data: {
                            fullName: user.fullName,
                            title: 'Giảng viên',
                            bio: `Giảng viên ${user.fullName}`,
                        },
                    });
                }
            }
            return updatedUser;
        });
        return result;
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
                where: { userId: userId },
            });
            await tx.enrollment.deleteMany({
                where: { userId: userId },
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
            where: { userId: userId },
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
                    userId: userId,
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
                where: { userId: userId },
            }),
            database_1.prisma.lessonProgress.count({
                where: {
                    userId: userId,
                    status: 'COMPLETED',
                },
            }),
            database_1.prisma.lessonProgress.count({
                where: { userId: userId },
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
    static async getUsers(params) {
        const { page = 1, limit = 10, search, role } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (role && role !== 'ALL') {
            where.role = role;
        }
        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            database_1.prisma.user.findMany({
                where,
                skip,
                take: limit,
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    role: true,
                    profilePictureUrl: true,
                    createdAt: true,
                    _count: {
                        select: {
                            enrollments: true,
                            lessonProgress: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            database_1.prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Users retrieved successfully',
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
    static async getAllInstructors(params) {
        const { page = 1, limit = 10, search } = params;
        const skip = (page - 1) * limit;
        const where = {
            role: types_2.UserRole.INSTRUCTOR,
        };
        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [instructorsWithCounts, total] = await Promise.all([
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
                    _count: {
                        select: {
                            createdCourses: true,
                        },
                    },
                },
            }),
            database_1.prisma.user.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Instructors retrieved successfully',
            data: instructorsWithCounts,
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
    static async assignCourseToUser(userId, courseId, adminId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        const course = await database_1.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new types_1.AppError('Course not found', 404);
        }
        const existingEnrollment = await database_1.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (existingEnrollment) {
            throw new types_1.AppError('User is already enrolled in this course', 400);
        }
        const enrollment = await database_1.prisma.enrollment.create({
            data: {
                userId,
                courseId,
                enrollmentType: 'ADMIN_ASSIGNED',
                assignedBy: adminId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
                course: {
                    select: {
                        id: true,
                        title: true,
                        courseCode: true,
                    },
                },
            },
        });
        return enrollment;
    }
    static async removeCourseFromUser(userId, courseId) {
        const enrollment = await database_1.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (!enrollment) {
            throw new types_1.AppError('Enrollment not found', 404);
        }
        await database_1.prisma.enrollment.delete({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        await database_1.prisma.lessonProgress.deleteMany({
            where: {
                userId,
                lesson: {
                    module: {
                        courseId,
                    },
                },
            },
        });
    }
    static async getUserAssignedCourses(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new types_1.AppError('User not found', 404);
        }
        const enrollments = await database_1.prisma.enrollment.findMany({
            where: {
                userId,
                enrollmentType: 'ADMIN_ASSIGNED',
            },
            include: {
                course: {
                    include: {
                        modules: {
                            include: {
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
                    status: 'COMPLETED',
                    lesson: {
                        module: {
                            courseId: enrollment.courseId,
                        },
                    },
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
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map