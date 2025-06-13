"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const database_1 = require("../config/database");
const types_1 = require("../types");
class CourseService {
    static async getAllCourses(params, userId) {
        const page = parseInt(params.page || '1');
        const limit = parseInt(params.limit || '10');
        const search = params.search || '';
        const sortBy = params.sortBy || 'createdAt';
        const sortOrder = params.sortOrder || 'desc';
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { courseCode: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};
        const [courses, total] = await Promise.all([
            database_1.prisma.course.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            fullName: true,
                        },
                    },
                    _count: {
                        select: {
                            enrollments: true,
                            modules: true,
                        },
                    },
                    ...(userId && {
                        enrollments: {
                            where: { userId },
                            select: { id: true },
                        },
                    }),
                },
            }),
            database_1.prisma.course.count({ where }),
        ]);
        return {
            courses: courses.map((course) => ({
                ...course,
                isEnrolled: userId ? course.enrollments?.length > 0 : false,
                enrollments: undefined,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    static async getCourseById(courseId, userId) {
        const course = await database_1.prisma.course.findUnique({
            where: { id: courseId },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                modules: {
                    orderBy: { moduleOrder: 'asc' },
                    include: {
                        lessons: {
                            orderBy: { lessonOrder: 'asc' },
                            include: {
                                instructor: {
                                    select: {
                                        id: true,
                                        fullName: true,
                                        title: true,
                                    },
                                },
                                resources: {
                                    orderBy: { title: 'asc' },
                                },
                                ...(userId && {
                                    lessonProgress: {
                                        where: { userId },
                                        select: {
                                            status: true,
                                            completedAt: true,
                                        },
                                    },
                                }),
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        enrollments: true,
                    },
                },
                ...(userId && {
                    enrollments: {
                        where: { userId },
                        select: { id: true },
                    },
                }),
            },
        });
        if (!course) {
            throw new types_1.AppError('Course not found', 404);
        }
        const transformedCourse = {
            ...course,
            isEnrolled: userId ? course.enrollments?.length > 0 : false,
            modules: course.modules.map((module) => ({
                ...module,
                lessons: module.lessons.map((lesson) => ({
                    ...lesson,
                    progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
                    lessonProgress: undefined,
                })),
            })),
            enrollments: undefined,
        };
        return transformedCourse;
    }
    static async createCourse(data, createdById) {
        const courseCode = `COURSE_${Date.now()}`;
        const course = await database_1.prisma.course.create({
            data: {
                ...data,
                courseCode,
                createdById,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                _count: {
                    select: {
                        enrollments: true,
                        modules: true,
                    },
                },
            },
        });
        return course;
    }
    static async updateCourse(courseId, data) {
        const existingCourse = await database_1.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!existingCourse) {
            throw new types_1.AppError('Course not found', 404);
        }
        if (data.courseCode && data.courseCode !== existingCourse.courseCode) {
            const courseWithSameCode = await database_1.prisma.course.findUnique({
                where: { courseCode: data.courseCode },
            });
            if (courseWithSameCode) {
                throw new types_1.AppError('Course code already exists', 400);
            }
        }
        const course = await database_1.prisma.course.update({
            where: { id: courseId },
            data,
            include: {
                createdBy: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                _count: {
                    select: {
                        enrollments: true,
                        modules: true,
                    },
                },
            },
        });
        return course;
    }
    static async deleteCourse(courseId) {
        const course = await database_1.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new types_1.AppError('Course not found', 404);
        }
        await database_1.prisma.course.delete({
            where: { id: courseId },
        });
        return { message: 'Course deleted successfully' };
    }
    static async enrollUser(userId, courseId) {
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
            },
            include: {
                course: {
                    select: {
                        id: true,
                        courseCode: true,
                        title: true,
                        description: true,
                    },
                },
            },
        });
        return enrollment;
    }
    static async unenrollUser(userId, courseId) {
        const enrollment = await database_1.prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (!enrollment) {
            throw new types_1.AppError('User is not enrolled in this course', 400);
        }
        await database_1.prisma.enrollment.delete({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        return { message: 'Successfully unenrolled from course' };
    }
    static async getUserEnrolledCourses(userId) {
        const enrollments = await database_1.prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: {
                    include: {
                        createdBy: {
                            select: {
                                id: true,
                                fullName: true,
                            },
                        },
                        _count: {
                            select: {
                                modules: true,
                            },
                        },
                    },
                },
            },
            orderBy: { enrollmentDate: 'desc' },
        });
        return enrollments.map((enrollment) => ({
            ...enrollment,
            course: {
                ...enrollment.course,
                isEnrolled: true,
            },
        }));
    }
}
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map