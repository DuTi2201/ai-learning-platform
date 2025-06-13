import { PrismaClient } from '@prisma/client';
import { prisma } from '../config/database';
import { AppError } from '../types';
import {
  UpdateUserRequest,
  PaginationParams,
  PaginatedResponse,
  UserRole,
} from '../types';

export class UserService {
  // Get all users with pagination and search (Admin only)
  static async getAllUsers(
    params: PaginationParams & { search?: string; role?: UserRole }
  ): Promise<PaginatedResponse<any>> {
    const { page = 1, limit = 10, search, role } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    if (role) {
      where.role = role;
    }

    const [usersWithCounts, total] = await Promise.all([
      prisma.user.findMany({
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
              lessonProgress: { where: { status: 'COMPLETED' } }, // Corrected status to uppercase
            },
          },
        },
      }),
      prisma.user.count({ where }),
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

  // Get user by ID
  static async getUserById(userId: string, includePrivate: boolean = false) {
    let includeOptions = {};
    if (includePrivate) {
      includeOptions = {
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                courseCode: true, // As per designDB.md
                // Add other fields if needed from Course table
              },
            },
          },
          orderBy: { enrollment_date: 'desc' },
        },
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: Object.keys(includeOptions).length > 0 ? includeOptions : undefined,
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  // Get user by email
  static async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        profilePictureUrl: true,
        createdAt: true,
        // updatedAt: true, // Removed as it's not in designDB.md
      },
    });

    return user;
  }

  // Create or update user (for OAuth)
  static async createOrUpdateUser(userData: {
    email: string;
    fullName: string;
    profilePictureUrl?: string;
    googleId: string;
  }) {
    const { email, fullName, profilePictureUrl, googleId } = userData;

    const user = await prisma.user.upsert({
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
        role: UserRole.USER, // Corrected: Use UserRole enum
      },
    });

    return user;
  }

  // Update user profile
  static async updateUser(userId: string, data: UpdateUserRequest) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new AppError('User not found', 404);
    }

    // If email is being updated, ensure it's not taken by another user
    if (data.email && data.email !== existingUser.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: userId }, // Exclude the current user
        },
      });

      if (emailExists) {
        throw new AppError('Another user with this email already exists', 400);
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
      },
    });

    return user;
  }

  // Update user role (Admin only)
  static async updateUserRole(userId: string, role: UserRole) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
      },
    });

    return updatedUser;
  }

  // Delete user (Admin only)
  static async deleteUser(userId: string) {
    const user = await prisma.user.findUnique({
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
      throw new AppError('User not found', 404);
    }

    // Delete user and all related data in a transaction
    await prisma.$transaction(async (tx: any) => {
      // Delete user progress
      await tx.lessonProgress.deleteMany({
        where: { userId: userId }, // Corrected to userId
      });

      // Delete user enrollments
      await tx.enrollment.deleteMany({
        where: { userId: userId }, // Corrected to userId
      });

      // Delete user
      await tx.user.delete({
        where: { id: userId },
      });
    });

    return { message: 'User deleted successfully' };
  }

  // Get user's learning progress
  static async getUserProgress(userId: string) {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const progress = await prisma.lessonProgress.findMany({
      where: { userId: userId }, // Corrected to userId
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

  // Get user's enrolled courses with progress
  static async getUserEnrolledCourses(userId: string) {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const enrollments = await prisma.enrollment.findMany({
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

    // Calculate progress for each course
    const coursesWithProgress = await Promise.all(
      enrollments.map(async (enrollment: any) => {
        const totalLessons = enrollment.course.modules.reduce(
          (total: number, module: any) => total + module.lessons.length,
          0
        );

        const completedLessons = await prisma.lessonProgress.count({
          where: {
            userId: userId, // Corrected to userId
            lesson: {
              module: {
                courseId: enrollment.course.id,
              },
            },
            status: 'COMPLETED', // Corrected status to uppercase
          },
        });

        const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

        return {
          ...enrollment,
          course: {
            ...enrollment.course,
            modules: undefined, // Remove modules from response
          },
          progress: {
            totalLessons,
            completedLessons,
            progressPercentage: Math.round(progressPercentage * 100) / 100,
          },
        };
      })
    );

    return coursesWithProgress;
  }

  // Get user statistics
  static async getUserStats(userId: string) {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const [enrollmentsCount, completedLessonsCount, totalProgressCount] = await Promise.all([
      prisma.enrollment.count({
        where: { userId: userId }, // Corrected to userId
      }),
      prisma.lessonProgress.count({
        where: {
          userId: userId, // Corrected to userId
          status: 'COMPLETED', // Corrected status to uppercase
        },
      }),
      prisma.lessonProgress.count({
        where: { userId: userId }, // Corrected to userId
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
        completionRate: totalProgressCount > 0 ? (completedLessonsCount / totalProgressCount) * 100 : 0,
      },
    };
  }
}
