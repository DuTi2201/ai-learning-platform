import { prisma } from '../config/database';
import { AppError } from '../types';
import {
  CreateCourseRequest,
  UpdateCourseRequest,
  CourseWithDetails,
  QueryParams,
} from '../types';

export class CourseService {
  // Get all courses with pagination and search
  static async getAllCourses(params: QueryParams, userId?: string) {
    const page = parseInt(params.page || '1');
    const limit = parseInt(params.limit || '10');
    const search = params.search || '';
    const sortBy = params.sortBy || 'createdAt';
    const sortOrder = params.sortOrder || 'desc';

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' as const } },
            { courseCode: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          createdBy: {
            select: {
              id: true,
              fullName: true,
            },
          },
          _count: {
            select: {
              enrollments: true,
              modules: true,
            },
          },
          ...(userId && {
            enrollments: {
              where: { userId },
              select: { id: true },
            },
          }),
        },
      }),
      prisma.course.count({ where }),
    ]);

    return {
      courses: courses.map((course: any) => ({
        ...course,
        isEnrolled: userId ? course.enrollments?.length > 0 : false,
        enrollments: undefined, // Remove from response
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get course by ID with full details
  static async getCourseById(courseId: string, userId?: string): Promise<CourseWithDetails> {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
          },
        },
        modules: {
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
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
        ...(userId && {
          enrollments: {
            where: { userId },
            select: { id: true },
          },
        }),
      },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Transform the data to include progress information
    const transformedCourse = {
      ...course,
      isEnrolled: userId ? course.enrollments?.length > 0 : false,
      modules: course.modules.map((module: any) => ({
          ...module,
          lessons: module.lessons.map((lesson: any) => ({
          ...lesson,
          progress: userId && lesson.lessonProgress?.[0] ? lesson.lessonProgress[0] : null,
          lessonProgress: undefined, // Remove from response
        })),
      })),
      enrollments: undefined, // Remove from response
    };

    return transformedCourse as CourseWithDetails;
  }

  // Create new course
  static async createCourse(data: CreateCourseRequest, createdById: string) {
    // Generate unique course code
    const courseCode = `COURSE_${Date.now()}`;

    const course = await prisma.course.create({
      data: {
        ...data,
        courseCode,
        createdById,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            modules: true,
          },
        },
      },
    });

    return course;
  }

  // Update course
  static async updateCourse(courseId: string, data: UpdateCourseRequest) {
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!existingCourse) {
      throw new AppError('Course not found', 404);
    }

    // Check if new course code already exists (if provided)
    if (data.courseCode && data.courseCode !== existingCourse.courseCode) {
      const courseWithSameCode = await prisma.course.findUnique({
        where: { courseCode: data.courseCode },
      });

      if (courseWithSameCode) {
        throw new AppError('Course code already exists', 400);
      }
    }

    const course = await prisma.course.update({
      where: { id: courseId },
      data,
      include: {
        createdBy: {
          select: {
            id: true,
            fullName: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            modules: true,
          },
        },
      },
    });

    return course;
  }

  // Delete course
  static async deleteCourse(courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    await prisma.course.delete({
      where: { id: courseId },
    });

    return { message: 'Course deleted successfully' };
  }

  // Enroll user in course
  static async enrollUser(userId: string, courseId: string) {
    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new AppError('User is already enrolled in this course', 400);
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        course: {
          select: {
            id: true,
            courseCode: true,
            title: true,
            description: true,
          },
        },
      },
    });

    return enrollment;
  }

  // Unenroll user from course
  static async unenrollUser(userId: string, courseId: string) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      throw new AppError('User is not enrolled in this course', 400);
    }

    await prisma.enrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return { message: 'Successfully unenrolled from course' };
  }

  // Get user's enrolled courses
  static async getUserEnrolledCourses(userId: string) {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            createdBy: {
              select: {
                id: true,
                fullName: true,
              },
            },
            _count: {
              select: {
                modules: true,
              },
            },
          },
        },
      },
      orderBy: { enrollmentDate: 'desc' },
    });

    return enrollments.map((enrollment: any) => ({
      ...enrollment,
      course: {
        ...enrollment.course,
        isEnrolled: true,
      },
    }));
  }
}