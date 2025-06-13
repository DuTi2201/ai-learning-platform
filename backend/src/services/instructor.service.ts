import { prisma } from '../config/database';
import { AppError } from '../types';
import {
  CreateInstructorRequest,
  UpdateInstructorRequest,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export class InstructorService {
  // Get all instructors with pagination and search
  static async getAllInstructors(
    params: PaginationParams & { search?: string }
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10, search } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' as const } },
        { bio: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    const [instructors, total] = await Promise.all([
      prisma.instructor.findMany({
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
      prisma.instructor.count({ where: Object.keys(where).length > 0 ? where : undefined }),
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

  // Get instructor by ID
  static async getInstructorById(instructorId: string) {
    const instructor = await prisma.instructor.findUnique({
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
      throw new AppError('Instructor not found', 404);
    }

    return instructor;
  }

  // Create new instructor
  static async createInstructor(data: CreateInstructorRequest) {
    const instructor = await prisma.instructor.create({
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

  // Update instructor
  static async updateInstructor(instructorId: string, data: UpdateInstructorRequest) {
    // Check if instructor exists
    const existingInstructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });

    if (!existingInstructor) {
      throw new AppError('Instructor not found', 404);
    }

    const instructor = await prisma.instructor.update({
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

  // Delete instructor
  static async deleteInstructor(instructorId: string) {
    const instructor = await prisma.instructor.findUnique({
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
      throw new AppError('Instructor not found', 404);
    }

    // Check if instructor has lessons
    if (instructor._count.lessons > 0) {
      throw new AppError(
        'Cannot delete instructor with associated lessons. Please reassign or delete lessons first.',
        400
      );
    }

    await prisma.instructor.delete({
      where: { id: instructorId },
    });

    return { message: 'Instructor deleted successfully' };
  }

  // Get instructor's lessons
  static async getInstructorLessons(instructorId: string) {
    // Check if instructor exists
    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });

    if (!instructor) {
      throw new AppError('Instructor not found', 404);
    }

    const lessons = await prisma.lesson.findMany({
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

  // Get instructor statistics
  static async getInstructorStats(instructorId: string) {
    // Check if instructor exists
    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });

    if (!instructor) {
      throw new AppError('Instructor not found', 404);
    }

    const [lessonsCount, coursesCount, studentsCount] = await Promise.all([
      // Total lessons taught
      prisma.lesson.count({
        where: { instructorId },
      }),
      // Total courses involved in
      prisma.lesson.findMany({
        where: { instructorId },
        include: {
          module: true,
        },
        distinct: ['moduleId'],
      }).then((lessons: any) => {
        const courseIds = new Set(
          lessons.map((lesson: any) => lesson.module.courseId)
        );
        return courseIds.size;
      }),
      // Total students taught (unique students across all courses)
      prisma.enrollment.findMany({
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
      }).then((enrollments: any) => enrollments.length),
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