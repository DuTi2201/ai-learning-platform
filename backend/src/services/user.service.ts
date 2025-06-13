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

    const [users, total] = await Promise.all([
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
              lessonProgress: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
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
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: includePrivate ? {
        enrollments: {
          include: {
            course: true,
          },
          orderBy: { enrollmentDate: 'desc' },
        },
      } : undefined,
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
        updatedAt: true,
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
        role: UserRole.USER, // Default role
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
    await prisma.$transaction(async (tx) => {
      // Delete user progress
      await tx.lessonProgress.deleteMany({
        where: { userId },
      });

      // Delete user enrollments
      await tx.enrollment.deleteMany({
        where: { userId },
      });

      // Delete user
      await tx.user.delete({
        where: { id: userId },
      });
    });

    return { message: 'User deleted successfully' };
  }

  // Get user progress
  static async getUserProgress(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const progress = await prisma.lessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return progress;
  }

  // Get user enrolled courses
  static async getUserEnrolledCourses(userId: string) {
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
          include: {
            modules: {
              include: {
                lessons: {
                  include: {
                    _count: {
                      select: {
                        progress: {
                          where: { userId },
                        },
                      },
                    },
                  },
                },
              },
              orderBy: { moduleOrder: 'asc' },
            },
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
        },
      },
      orderBy: { enrollmentDate: 'desc' },
    });

    return enrollments;
  }

  // Get user statistics
  static async getUserStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const [enrollmentsCount, completedLessonsCount, totalLessonsCount] = await Promise.all([
      // Total enrolled courses
      prisma.enrollment.count({
        where: { userId },
      }),
      // Completed lessons
      prisma.lessonProgress.count({
        where: {
          userId,
          isCompleted: true,
        },
      }),
      // Total lessons in enrolled courses
      prisma.lesson.count({
        where: {
          module: {
            course: {
              enrollments: {
                some: {
                  userId,
                },
              },
            },
          },
        },
      }),
    ]);

    const completionRate = totalLessonsCount > 0 
      ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
      : 0;

    return {
      user,
      stats: {
        totalEnrollments: enrollmentsCount,
        completedLessons: completedLessonsCount,
        totalLessons: totalLessonsCount,
        completionRate,
      },
    };
  }
}
