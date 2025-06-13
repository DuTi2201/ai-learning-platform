"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorService = void 0;
const database_1 = require("../config/database");
const types_1 = require("../types");
class InstructorService {
    static async getAllInstructors(params) {
        const { page = 1, limit = 10, search } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { fullName: { contains: search, mode: 'insensitive' } },
                { bio: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [instructors, total] = await Promise.all([
            database_1.prisma.instructor.findMany({
                where,
                skip,
                take: limit,
                orderBy: { fullName: 'asc' },
                include: {
                    _count: {
                        select: {
                            lessons: true,
                        },
                    },
                },
            }),
            database_1.prisma.instructor.count({ where: Object.keys(where).length > 0 ? where : undefined }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Instructors retrieved successfully',
            data: instructors,
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
    static async getInstructorById(instructorId) {
        const instructor = await database_1.prisma.instructor.findUnique({
            where: { id: instructorId },
            include: {
                lessons: {
                    include: {
                        module: {
                            include: {
                                course: true,
                            },
                        },
                    },
                    orderBy: { lessonOrder: 'asc' },
                },
            },
        });
        if (!instructor) {
            throw new types_1.AppError('Instructor not found', 404);
        }
        return instructor;
    }
    static async createInstructor(data) {
        const instructor = await database_1.prisma.instructor.create({
            data,
            include: {
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });
        return instructor;
    }
    static async updateInstructor(instructorId, data) {
        const existingInstructor = await database_1.prisma.instructor.findUnique({
            where: { id: instructorId },
        });
        if (!existingInstructor) {
            throw new types_1.AppError('Instructor not found', 404);
        }
        const instructor = await database_1.prisma.instructor.update({
            where: { id: instructorId },
            data,
            include: {
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });
        return instructor;
    }
    static async deleteInstructor(instructorId) {
        const instructor = await database_1.prisma.instructor.findUnique({
            where: { id: instructorId },
            include: {
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });
        if (!instructor) {
            throw new types_1.AppError('Instructor not found', 404);
        }
        if (instructor._count.lessons > 0) {
            throw new types_1.AppError('Cannot delete instructor with associated lessons. Please reassign or delete lessons first.', 400);
        }
        await database_1.prisma.instructor.delete({
            where: { id: instructorId },
        });
        return { message: 'Instructor deleted successfully' };
    }
    static async getInstructorLessons(instructorId) {
        const instructor = await database_1.prisma.instructor.findUnique({
            where: { id: instructorId },
        });
        if (!instructor) {
            throw new types_1.AppError('Instructor not found', 404);
        }
        const lessons = await database_1.prisma.lesson.findMany({
            where: { instructorId },
            orderBy: { lessonOrder: 'asc' },
            include: {
                module: {
                    include: {
                        course: true,
                    },
                },
                _count: {
                    select: {
                        resources: true,
                    },
                },
            },
        });
        return lessons;
    }
    static async getInstructorStats(instructorId) {
        const instructor = await database_1.prisma.instructor.findUnique({
            where: { id: instructorId },
        });
        if (!instructor) {
            throw new types_1.AppError('Instructor not found', 404);
        }
        const [lessonsCount, coursesCount, studentsCount] = await Promise.all([
            database_1.prisma.lesson.count({
                where: { instructorId },
            }),
            database_1.prisma.lesson.findMany({
                where: { instructorId },
                include: {
                    module: true,
                },
                distinct: ['moduleId'],
            }).then((lessons) => {
                const courseIds = new Set(lessons.map((lesson) => lesson.module.courseId));
                return courseIds.size;
            }),
            database_1.prisma.enrollment.findMany({
                where: {
                    course: {
                        modules: {
                            some: {
                                lessons: {
                                    some: {
                                        instructorId,
                                    },
                                },
                            },
                        },
                    },
                },
                distinct: ['userId'],
            }).then((enrollments) => enrollments.length),
        ]);
        return {
            instructor,
            stats: {
                totalLessons: lessonsCount,
                totalCourses: coursesCount,
                totalStudents: studentsCount,
            },
        };
    }
}
exports.InstructorService = InstructorService;
//# sourceMappingURL=instructor.service.js.map