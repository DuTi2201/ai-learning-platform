import { PrismaClient } from '@prisma/client';
import { prisma } from '../config/database';
import { AppError } from '../types';
import {
  CreateLessonRequest,
  UpdateLessonRequest,
  LessonWithDetails,
  LessonStatus,
} from '../types';

export class LessonService {
  // Get all lessons for a module
  static async getLessonsByModule(moduleId: string, userId?: string) {
    // Check if module exists
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new AppError('Module not found', 404);
    }

    const lessons = await prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { lessonOrder: 'asc' },
      include: {
        instructor: {
          select: {
            id: true,
            fullName: true,
            title: true,
          },
        },
        _count: {
          select: {
            resources: true,
          },
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
    });

    // Transform the data to include progress information
    return lessons.map((lesson: any) => ({
      ...lesson,
      progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
      lessonProgress: undefined, // Remove from response
    }));
  }

  // Get lesson by ID with full details
  static async getLessonById(lessonId: string, userId?: string): Promise<LessonWithDetails> {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                courseCode: true,
                title: true,
              },
            },
          },
        },
        instructor: {
          select: {
            id: true,
            fullName: true,
            title: true,
            bio: true,
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
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Transform the data to include progress information
    const transformedLesson = {
      ...lesson,
      progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
      lessonProgress: undefined, // Remove from response
    };

    return transformedLesson as LessonWithDetails;
  }

  // Create new lesson
  static async createLesson(data: CreateLessonRequest) {
    // Check if module exists
    const module = await prisma.module.findUnique({
      where: { id: data.moduleId },
    });

    if (!module) {
      throw new AppError('Module not found', 404);
    }

    // Check if instructor exists (if provided)
    if (data.instructorId) {
      const instructor = await prisma.instructor.findUnique({
        where: { id: data.instructorId },
      });

      if (!instructor) {
        throw new AppError('Instructor not found', 404);
      }
    }

    // Get the next lesson order if not provided
    let lessonOrder = data.lessonOrder;
    if (!lessonOrder) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { moduleId: data.moduleId },
        orderBy: { lessonOrder: 'desc' },
      });
      lessonOrder = lastLesson ? lastLesson.lessonOrder + 1 : 1;
    }

    // Check if lesson order already exists
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        moduleId: data.moduleId,
        lessonOrder: lessonOrder,
      },
    });

    if (existingLesson) {
      // Shift existing lessons to make room
      await prisma.lesson.updateMany({
        where: {
          moduleId: data.moduleId,
          lessonOrder: { gte: lessonOrder },
      },
      data: {
        lessonOrder: { increment: 1 },
        },
      });
    }

    const lesson = await prisma.lesson.create({
      data: {
        ...data,
        lessonOrder: lessonOrder,
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
          },
        },
        instructor: {
          select: {
            id: true,
            fullName: true,
            title: true,
          },
        },
        _count: {
          select: {
            resources: true,
          },
        },
      },
    });

    return lesson;
  }

  // Update lesson
  static async updateLesson(lessonId: string, data: UpdateLessonRequest) {
    // Check if lesson exists
    const existingLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!existingLesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Check if instructor exists (if provided)
    if (data.instructorId) {
      const instructor = await prisma.instructor.findUnique({
        where: { id: data.instructorId },
      });

      if (!instructor) {
        throw new AppError('Instructor not found', 404);
      }
    }

    // Handle lesson order change
    if (data.lessonOrder && data.lessonOrder !== existingLesson.lessonOrder) {
      const moduleId = existingLesson.moduleId;
      const oldOrder = existingLesson.lessonOrder;
      const newOrder = data.lessonOrder;

      if (newOrder > oldOrder) {
        // Moving down: shift lessons up
        await prisma.lesson.updateMany({
          where: {
            moduleId,
            lessonOrder: {
              gt: oldOrder,
              lte: newOrder,
            },
          },
          data: {
            lessonOrder: { decrement: 1 },
          },
        });
      } else {
        // Moving up: shift lessons down
        await prisma.lesson.updateMany({
          where: {
            moduleId,
            lessonOrder: {
              gte: newOrder,
              lt: oldOrder,
            },
          },
          data: {
            lessonOrder: { increment: 1 },
          },
        });
      }
    }

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data,
      include: {
        module: {
          select: {
            id: true,
            title: true,
          },
        },
        instructor: {
          select: {
            id: true,
            fullName: true,
            title: true,
          },
        },
        _count: {
          select: {
            resources: true,
          },
        },
      },
    });

    return lesson;
  }

  // Delete lesson
  static async deleteLesson(lessonId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Delete the lesson (cascade will handle resources and progress)
    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    // Reorder remaining lessons
    await prisma.lesson.updateMany({
      where: {
        moduleId: lesson.moduleId,
        lessonOrder: { gt: lesson.lessonOrder },
      },
      data: {
        lessonOrder: { decrement: 1 },
      },
    });

    return { message: 'Lesson deleted successfully' };
  }

  // Update lesson progress
  static async updateLessonProgress(userId: string, lessonId: string, status: LessonStatus) {
    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: {
              include: {
                enrollments: {
                  where: { userId },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Check if user is enrolled in the course
    if (lesson.module.course.enrollments.length === 0) {
      throw new AppError('User is not enrolled in this course', 403);
    }

    // Update or create lesson progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        status,
        completedAt: status === LessonStatus.COMPLETED ? new Date() : null,
      },
      create: {
        userId,
        lessonId,
        status,
        completedAt: status === LessonStatus.COMPLETED ? new Date() : null,
      },
    });

    return progress;
  }

  // Get user's lesson progress for a course
  static async getUserLessonProgress(userId: string, courseId: string) {
    // Check if user is enrolled in the course
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      throw new AppError('User is not enrolled in this course', 403);
    }

    const progress = await prisma.lessonProgress.findMany({
      where: {
        userId,
        lesson: {
          module: {
            courseId,
          },
        },
      },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            moduleId: true,
          },
        },
      },
      orderBy: {
        lesson: {
          lessonOrder: 'asc',
        },
      },
    });

    return progress;
  }

  // Reorder lessons
  static async reorderLessons(moduleId: string, lessonOrders: { lessonId: string; order: number }[]) {
    // Check if module exists
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new AppError('Module not found', 404);
    }

    // Validate that all lessons belong to the module
    const lessonIds = lessonOrders.map((item: any) => item.lessonId);
    const lessons = await prisma.lesson.findMany({
      where: {
        id: { in: lessonIds },
        moduleId,
      },
    });

    if (lessons.length !== lessonIds.length) {
      throw new AppError('Some lessons do not belong to this module', 400);
    }

    // Update lesson orders in a transaction
    await prisma.$transaction(
      lessonOrders.map(({ lessonId, order }: any) =>
        prisma.lesson.update({
          where: { id: lessonId },
          data: { lessonOrder: order },
        })
      )
    );

    return { message: 'Lessons reordered successfully' };
  }
}