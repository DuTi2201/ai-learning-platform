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
    params: PaginationParams & { search?: string; expertise?: string }
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10, search, expertise } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { expertise: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    if (expertise) {
      where.expertise = { contains: expertise, mode: 'insensitive' as const };
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
      prisma.instructor.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
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
    // @ts-ignore
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
    // Check if email already exists
    if (data.email) {
      const existingInstructor = await prisma.instructor.findUnique({
        where: { email: data.email },
      });

      if (existingInstructor) {
        throw new AppError('Instructor with this email already exists', 400);
      }
    }

    // @ts-ignore
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

    // Check if email is being updated and already exists
    if (data.email && data.email !== existingInstructor.email) {
      const emailExists = await prisma.instructor.findUnique({
        where: { email: data.email },
      });

      if (emailExists) {
        throw new AppError('Instructor with this email already exists', 400);
      }
    }

    // @ts-ignore
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

    // @ts-ignore
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
      // @ts-ignore
      prisma.lesson.findMany({
        where: { instructorId },
        include: {
          module: true,
        },
        distinct: ['moduleId'],
      }).then(lessons => {
        const courseIds = new Set(
          lessons.map(lesson => lesson.module.courseId)
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
      }).then(enrollments => enrollments.length),
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

  // Search instructors by expertise
  static async searchByExpertise(expertise: string) {
    const instructors = await prisma.instructor.findMany({
      where: {
        expertise: {
          contains: expertise,
          mode: 'insensitive' as const,
        },
      },
      orderBy: { fullName: 'asc' },
      include: {
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    return instructors;
  }
}
