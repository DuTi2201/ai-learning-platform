import { PrismaClient } from '@prisma/client';
import { AppError, CreateInstructorRequest, InstructorResponse, PaginatedResponse, PaginationParams, QueryParams, UpdateInstructorRequest } from '../types';
import { getPaginationParams } from '../utils/pagination.utils';

const prisma = new PrismaClient();

export class InstructorService {
  // Get all instructors with pagination and search
  static async getAllInstructors(query: QueryParams): Promise<PaginatedResponse<InstructorResponse>> {
    const { page, limit } = getPaginationParams(query.page, query.limit);
    const offset = (page - 1) * limit;
    const search = query.search || '';

    const where: any = {};
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    const instructors = await prisma.instructor.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        [query.sortBy || 'createdAt']: query.sortOrder || 'desc',
      },
      select: {
        id: true,
        fullName: true,
        title: true,
        bio: true,
        _count: {
          select: { lessons: true }, // Assuming a relation 'lessons' exists on Instructor model
        },
      },
    });

    const total = await prisma.instructor.count({ where: Object.keys(where).length > 0 ? where : undefined });
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
  static async getInstructorById(id: string): Promise<InstructorResponse | null> {
    const instructor = await prisma.instructor.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        title: true,
        bio: true,
        _count: {
          select: { lessons: true },
        },
      },
    });

    if (!instructor) {
      throw new AppError('Instructor not found', 404);
    }
    return instructor;
  }

  // Create new instructor
  static async createInstructor(data: CreateInstructorRequest): Promise<InstructorResponse> {
    const instructor = await prisma.instructor.create({
      data,
      select: {
        id: true,
        fullName: true,
        title: true,
        bio: true,
      },
    });
    return instructor;
  }

  // Update instructor
  static async updateInstructor(id: string, data: UpdateInstructorRequest): Promise<InstructorResponse> {
    const existingInstructor = await prisma.instructor.findUnique({
      where: { id },
    });

    if (!existingInstructor) {
      throw new AppError('Instructor not found', 404);
    }

    const instructor = await prisma.instructor.update({
      where: { id },
      data,
      select: {
        id: true,
        fullName: true,
        title: true,
        bio: true,
      },
    });
    return instructor;
  }

  // Delete instructor
  static async deleteInstructor(id: string): Promise<void> {
    const existingInstructor = await prisma.instructor.findUnique({
      where: { id },
    });

    if (!existingInstructor) {
      throw new AppError('Instructor not found', 404);
    }

    // Add logic here to handle courses/lessons associated with the instructor before deletion if needed
    // For example, reassign them or prevent deletion if they have active courses.

    await prisma.instructor.delete({
      where: { id },
    });
  }

  // Get lessons taught by an instructor
  static async getInstructorLessons(instructorId: string, query: QueryParams) {
    const { page, limit } = getPaginationParams(query.page, query.limit);
    const offset = (page - 1) * limit;

    const lessons = await prisma.lesson.findMany({
      where: {
        module: {
          course: {
            instructorId: instructorId,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        [query.sortBy || 'createdAt']: query.sortOrder || 'desc',
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    const total = await prisma.lesson.count({
      where: {
        module: {
          course: {
            instructorId: instructorId,
          },
        },
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      message: 'Lessons retrieved successfully',
      data: lessons,
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
}
