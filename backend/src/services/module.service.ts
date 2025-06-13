import { PrismaClient } from '@prisma/client';
import { prisma } from '../config/database';
import { AppError } from '../types';
import {
  CreateModuleRequest,
  UpdateModuleRequest,
  ModuleWithDetails,
} from '../types';

export class ModuleService {
  // Get all modules (Admin only)
  static async getAllModules() {
    const modules = await prisma.module.findMany({
      orderBy: [{ courseId: 'asc' }, { moduleOrder: 'asc' }],
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    return modules;
  }

  // Get all modules for a course
  static async getModulesByCourse(courseId: string, userId?: string) {
    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    const modules = await prisma.module.findMany({
      where: { courseId },
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
        },
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    // Transform the data to include progress information
    return modules.map((module: any) => ({
      ...module,
      lessons: module.lessons.map((lesson: any) => ({
        ...lesson,
        progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
        lessonProgress: undefined, // Remove from response
      })),
    }));
  }

  // Get module by ID with full details
  static async getModuleById(moduleId: string, userId?: string): Promise<ModuleWithDetails> {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          select: {
            id: true,
            courseCode: true,
            title: true,
          },
        },
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
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    if (!module) {
      throw new AppError('Module not found', 404);
    }

    // Transform the data to include progress information
    const transformedModule = {
      ...module,
      lessons: module.lessons.map((lesson: any) => ({
        ...lesson,
        progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
        lessonProgress: undefined, // Remove from response
      })),
    };

    return transformedModule as ModuleWithDetails;
  }

  // Create new module
  static async createModule(data: CreateModuleRequest) {
    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: data.courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Get the next module order if not provided
    let moduleOrder = data.moduleOrder;
    if (!moduleOrder) {
      const lastModule = await prisma.module.findFirst({
        where: { courseId: data.courseId },
        orderBy: { moduleOrder: 'desc' },
      });
      moduleOrder = lastModule ? lastModule.moduleOrder + 1 : 1;
    }

    // Check if module order already exists
    const existingModule = await prisma.module.findFirst({
      where: {
        courseId: data.courseId,
        moduleOrder,
      },
    });

    if (existingModule) {
      // Shift existing modules to make room
      await prisma.module.updateMany({
        where: {
          courseId: data.courseId,
          moduleOrder: { gte: moduleOrder },
        },
        data: {
          moduleOrder: { increment: 1 },
        },
      });
    }

    const module = await prisma.module.create({
      data: {
        ...data,
        moduleOrder,
      },
      include: {
        course: {
          select: {
            id: true,
            courseCode: true,
            title: true,
          },
        },
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    return module;
  }

  // Update module
  static async updateModule(moduleId: string, data: UpdateModuleRequest) {
    // Check if module exists
    const existingModule = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!existingModule) {
      throw new AppError('Module not found', 404);
    }

    // Handle module order change
    if (data.moduleOrder && data.moduleOrder !== existingModule.moduleOrder) {
      const courseId = existingModule.courseId;
      const oldOrder = existingModule.moduleOrder;
      const newOrder = data.moduleOrder;

      if (newOrder > oldOrder) {
        // Moving down: shift modules up
        await prisma.module.updateMany({
          where: {
            courseId,
            moduleOrder: {
              gt: oldOrder,
              lte: newOrder,
            },
          },
          data: {
            moduleOrder: { decrement: 1 },
          },
        });
      } else {
        // Moving up: shift modules down
        await prisma.module.updateMany({
          where: {
            courseId,
            moduleOrder: {
              gte: newOrder,
              lt: oldOrder,
            },
          },
          data: {
            moduleOrder: { increment: 1 },
          },
        });
      }
    }

    const module = await prisma.module.update({
      where: { id: moduleId },
      data,
      include: {
        course: {
          select: {
            id: true,
            courseCode: true,
            title: true,
          },
        },
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });

    return module;
  }

  // Delete module
  static async deleteModule(moduleId: string) {
    const module = await prisma.module.findUnique({
      where: { id: moduleId },
    });

    if (!module) {
      throw new AppError('Module not found', 404);
    }

    // Delete the module (cascade will handle lessons and resources)
    await prisma.module.delete({
      where: { id: moduleId },
    });

    // Reorder remaining modules
    await prisma.module.updateMany({
      where: {
        courseId: module.courseId,
        moduleOrder: { gt: module.moduleOrder },
      },
      data: {
        moduleOrder: { decrement: 1 },
      },
    });

    return { message: 'Module deleted successfully' };
  }

  // Reorder modules
  static async reorderModules(courseId: string, moduleOrders: { moduleId: string; order: number }[]) {
    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Validate that all modules belong to the course
    const moduleIds = moduleOrders.map((item: any) => item.moduleId);
    const modules = await prisma.module.findMany({
      where: {
        id: { in: moduleIds },
        courseId,
      },
    });

    if (modules.length !== moduleIds.length) {
      throw new AppError('Some modules do not belong to this course', 400);
    }

    // Update module orders in a transaction
    await prisma.$transaction(
      moduleOrders.map(({ moduleId, order }: any) =>
        prisma.module.update({
          where: { id: moduleId },
          data: { moduleOrder: order },
        })
      )
    );

    return { message: 'Modules reordered successfully' };
  }
}