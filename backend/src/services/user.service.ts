import { PrismaClient, UserRole } from '@prisma/client';
import { CreateUserData, UpdateUserData } from '../types/user.types';

const prisma = new PrismaClient();

export class UserService {
  // Get all users (admin only)
  static async getAllUsers() {
    return await prisma.user.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Get users with pagination
  static async getUsersWithPagination(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
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
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get user by ID
  static async getUserById(userId: string, includePrivate: boolean = false) {
    let user;
    
    if (includePrivate) {
      // @ts-ignore
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          enrollments: {
            include: {
              course: true,
            },
            orderBy: { enrolledAt: 'desc' },
          },
        },
      });
    } else {
      // @ts-ignore
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    }

    if (!user) {
      throw new Error('User not found');
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
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

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

    // @ts-ignore
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

  // Create user
  static async createUser(userData: CreateUserData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    return await prisma.user.create({
      data: {
        ...userData,
        role: userData.role || UserRole.USER,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        profilePictureUrl: true,
        createdAt: true,
      },
    });
  }

  // Update user
  static async updateUser(userId: string, data: UpdateUserData) {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // @ts-ignore
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
      },
    });

    return user;
  }

  // Update user role (admin only)
  static async updateUserRole(userId: string, role: UserRole) {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // @ts-ignore
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
      },
    });

    return updatedUser;
  }

  // Delete user (admin only)
  static async deleteUser(userId: string) {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'User deleted successfully' };
  }

  // Get user statistics
  static async getUserStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    lessons: true,
                  },
                },
              },
            },
          },
        },
        lessonProgress: {
          where: {
            completed: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Calculate statistics
    const totalEnrollments = user.enrollments.length;
    const totalLessonsCompleted = user.lessonProgress.length;
    
    let totalLessonsAvailable = 0;
    user.enrollments.forEach(enrollment => {
      enrollment.course.modules.forEach(module => {
        totalLessonsAvailable += module.lessons.length;
      });
    });

    const completionRate = totalLessonsAvailable > 0 
      ? (totalLessonsCompleted / totalLessonsAvailable) * 100 
      : 0;

    return {
      totalEnrollments,
      totalLessonsCompleted,
      totalLessonsAvailable,
      completionRate: Math.round(completionRate * 100) / 100, // Round to 2 decimal places
    };
  }

  // Search users
  static async searchUsers(query: string, page: number = 1, limit: number = 10) {
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
          email: {
            contains: query,
            mode: 'insensitive' as const,
          },
        },
      ],
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          profilePictureUrl: true,
          createdAt: true,
        },
        orderBy: {
          fullName: 'asc',
        },
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}
