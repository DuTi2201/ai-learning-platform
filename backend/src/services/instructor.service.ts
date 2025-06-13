import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class InstructorService {
  // Get all instructors
  static async getAllInstructors() {
    return await prisma.instructor.findMany({
      select: {
        id: true,
        fullName: true,
        title: true,
        bio: true,
        _count: {
          select: {
            lessons: true,
          },
        },
      },
      orderBy: {
        fullName: 'asc',
      },
    });
  }

  // Get instructors with pagination
  static async getInstructorsWithPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [instructors, total] = await Promise.all([
      prisma.instructor.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          title: true,
          bio: true,
          _count: {
            select: {
              lessons: true,
            },
          },
        },
        orderBy: {
          fullName: 'asc',
        },
      }),
      prisma.instructor.count(),
    ]);

    return {
      instructors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
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
      throw new Error('Instructor not found');
    }

    return instructor;
  }

  // Create instructor
  static async createInstructor(instructorData: {
    fullName: string;
    title?: string;
    bio?: string;
  }) {
    return await prisma.instructor.create({
      data: instructorData,
      select: {
        id: true,
        fullName: true,
        title: true,
        bio: true,
      },
    });
  }

  // Update instructor
  static async updateInstructor(
    instructorId: string,
    instructorData: {
      fullName?: string;
      title?: string;
      bio?: string;
    }
  ) {
    const existingInstructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });

    if (!existingInstructor) {
      throw new Error('Instructor not found');
    }

    return await prisma.instructor.update({
      where: { id: instructorId },
      data: instructorData,
      select: {
        id: true,
        fullName: true,
        title: true,
        bio: true,
      },
    });
  }

  // Delete instructor
  static async deleteInstructor(instructorId: string) {
    const existingInstructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });

    if (!existingInstructor) {
      throw new Error('Instructor not found');
    }

    // Check if instructor has lessons
    const lessonsCount = await prisma.lesson.count({
      where: { instructorId },
    });

    if (lessonsCount > 0) {
      throw new Error('Cannot delete instructor with existing lessons');
    }

    await prisma.instructor.delete({
      where: { id: instructorId },
    });

    return { message: 'Instructor deleted successfully' };
  }

  // Get instructor statistics
  static async getInstructorStats(instructorId: string) {
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
            lessonProgress: true,
          },
        },
      },
    });

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    // Calculate statistics
    const totalLessons = instructor.lessons.length;
    const uniqueCourses = new Set(
      instructor.lessons.map(lesson => lesson.module.course.id)
    ).size;
    
    let totalStudents = 0;
    let totalCompletions = 0;
    
    instructor.lessons.forEach(lesson => {
      const uniqueStudents = new Set(
        lesson.lessonProgress.map(progress => progress.userId)
      ).size;
      totalStudents += uniqueStudents;
      
      totalCompletions += lesson.lessonProgress.filter(
        progress => progress.completed
      ).length;
    });

    return {
      totalLessons,
      totalCourses: uniqueCourses,
      totalStudents,
      totalCompletions,
    };
  }

  // Search instructors
  static async searchInstructors(query: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const whereClause = {
      OR: [
        {
          fullName: {
            contains: query,
            mode: 'insensitive' as const,
          },
        },
        {
          title: {
            contains: query,
            mode: 'insensitive' as const,
          },
        },
        {
          bio: {
            contains: query,
            mode: 'insensitive' as const,
          },
        },
      ],
    };

    const [instructors, total] = await Promise.all([
      prisma.instructor.findMany({
        where: whereClause,
        skip,
        take: limit,
        select: {
          id: true,
          fullName: true,
          title: true,
          bio: true,
          _count: {
            select: {
              lessons: true,
            },
          },
        },
        orderBy: {
          fullName: 'asc',
        },
      }),
      prisma.instructor.count({ where: whereClause }),
    ]);

    return {
      instructors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
