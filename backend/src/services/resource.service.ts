import { prisma } from '../config/database';
import { AppError } from '../types';
import {
  CreateResourceRequest,
  UpdateResourceRequest,
  ResourceType,
} from '../types';

export class ResourceService {
  // Get all resources for a lesson
  static async getResourcesByLesson(lessonId: string) {
    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    const resources = await prisma.resource.findMany({
      where: { lessonId },
      orderBy: { title: 'asc' },
    });

    return resources;
  }

  // Get resource by ID
  static async getResourceById(resourceId: string) {
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
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
          },
        },
      },
    });

    if (!resource) {
      throw new AppError('Resource not found', 404);
    }

    return resource;
  }

  // Create new resource
  static async createResource(data: CreateResourceRequest) {
    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: data.lessonId },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Validate resource type and URL
    if (data.type === ResourceType.LINK && !data.url) {
      throw new AppError('URL is required for link resources', 400);
    }

    if (data.type === ResourceType.PDF && !data.url) {
      throw new AppError('File URL is required for PDF resources', 400);
    }

    const resource = await prisma.resource.create({
      data,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return resource;
  }

  // Update resource
  static async updateResource(resourceId: string, data: UpdateResourceRequest) {
    // Check if resource exists
    const existingResource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!existingResource) {
      throw new AppError('Resource not found', 404);
    }

    // Validate resource type and URL if type is being updated
    const newType = data.type || existingResource.type;
    const newUrl = data.url !== undefined ? data.url : existingResource.url;

    if (newType === ResourceType.LINK && !newUrl) {
      throw new AppError('URL is required for link resources', 400);
    }

    if (newType === ResourceType.PDF && !newUrl) {
      throw new AppError('File URL is required for PDF resources', 400);
    }

    const resource = await prisma.resource.update({
      where: { id: resourceId },
      data,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return resource;
  }

  // Delete resource
  static async deleteResource(resourceId: string) {
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      throw new AppError('Resource not found', 404);
    }

    await prisma.resource.delete({
      where: { id: resourceId },
    });

    return { message: 'Resource deleted successfully' };
  }

  // Get resources by type
  static async getResourcesByType(type: ResourceType, lessonId?: string) {
    const where: any = { type };
    
    if (lessonId) {
      // Check if lesson exists
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
      });

      if (!lesson) {
        throw new AppError('Lesson not found', 404);
      }

      where.lessonId = lessonId;
    }

    const resources = await prisma.resource.findMany({
      where,
      orderBy: { title: 'asc' },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
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
          },
        },
      },
    });

    return resources;
  }

  // Search resources
  static async searchResources(query: string, type?: ResourceType, lessonId?: string) {
    const where: any = {
      OR: [
        { title: { contains: query, mode: 'insensitive' as const } },
        { description: { contains: query, mode: 'insensitive' as const } },
      ],
    };

    if (type) {
      where.type = type;
    }

    if (lessonId) {
      // Check if lesson exists
      const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
      });

      if (!lesson) {
        throw new AppError('Lesson not found', 404);
      }

      where.lessonId = lessonId;
    }

    const resources = await prisma.resource.findMany({
      where,
      orderBy: { title: 'asc' },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
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
          },
        },
      },
    });

    return resources;
  }

  // Bulk create resources
  static async bulkCreateResources(lessonId: string, resources: Omit<CreateResourceRequest, 'lessonId'>[]) {
    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    // Validate all resources
    for (const resource of resources) {
      if (resource.type === ResourceType.LINK && !resource.url) {
        throw new AppError(`URL is required for link resource: ${resource.title}`, 400);
      }

      if (resource.type === ResourceType.PDF && !resource.url) {
        throw new AppError(`File URL is required for PDF resource: ${resource.title}`, 400);
      }
    }

    // Create all resources in a transaction
    const createdResources = await prisma.$transaction(
      resources.map(resource =>
        prisma.resource.create({
          data: {
            ...resource,
            lessonId,
          },
        })
      )
    );

    return createdResources;
  }
}