import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';
import moduleRoutes from './module.routes';
import lessonRoutes from './lesson.routes';
import resourceRoutes from './resource.routes';
import instructorRoutes from './instructor.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI Learning Platform API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);
router.use('/modules', moduleRoutes);
router.use('/lessons', lessonRoutes);
router.use('/resources', resourceRoutes);
router.use('/instructors', instructorRoutes);

// API documentation endpoint
router.get('/docs', (req, res) => {
  res.json({
    success: true,
    message: 'AI Learning Platform API Documentation',
    endpoints: {
      auth: {
        'POST /api/auth/google': 'Google OAuth login',
        'GET /api/auth/google/callback': 'Google OAuth callback',
        'GET /api/auth/me': 'Get current user',
        'POST /api/auth/logout': 'Logout user',
        'POST /api/auth/refresh': 'Refresh JWT token',
      },
      users: {
        'GET /api/users': 'Get all users (Admin)',
        'GET /api/users/me': 'Get current user profile',
        'PUT /api/users/me': 'Update current user profile',
        'GET /api/users/me/progress': 'Get current user progress',
        'GET /api/users/me/courses': 'Get current user courses',
        'GET /api/users/me/stats': 'Get current user statistics',
        'GET /api/users/:userId': 'Get user by ID',
        'PUT /api/users/:userId': 'Update user (Admin)',
        'PATCH /api/users/:userId/role': 'Update user role (Admin)',
        'DELETE /api/users/:userId': 'Delete user (Admin)',
      },
      courses: {
        'GET /api/courses': 'Get all courses',
        'GET /api/courses/:courseId': 'Get course by ID',
        'POST /api/courses': 'Create course (Admin)',
        'PUT /api/courses/:courseId': 'Update course (Admin)',
        'DELETE /api/courses/:courseId': 'Delete course (Admin)',
        'POST /api/courses/:courseId/enroll': 'Enroll in course',
        'DELETE /api/courses/:courseId/enroll': 'Unenroll from course',
        'GET /api/courses/enrolled': 'Get enrolled courses',
      },
      modules: {
        'GET /api/modules/course/:courseId': 'Get modules by course',
        'GET /api/modules/:moduleId': 'Get module by ID',
        'POST /api/modules': 'Create module (Admin)',
        'PUT /api/modules/:moduleId': 'Update module (Admin)',
        'DELETE /api/modules/:moduleId': 'Delete module (Admin)',
        'PUT /api/modules/reorder': 'Reorder modules (Admin)',
      },
      lessons: {
        'GET /api/lessons/module/:moduleId': 'Get lessons by module',
        'GET /api/lessons/:lessonId': 'Get lesson by ID',
        'POST /api/lessons': 'Create lesson (Admin)',
        'PUT /api/lessons/:lessonId': 'Update lesson (Admin)',
        'DELETE /api/lessons/:lessonId': 'Delete lesson (Admin)',
        'PUT /api/lessons/reorder': 'Reorder lessons (Admin)',
        'PUT /api/lessons/:lessonId/progress': 'Update lesson progress',
        'GET /api/lessons/progress/course/:courseId': 'Get lesson progress for course',
      },
      resources: {
        'GET /api/resources/lesson/:lessonId': 'Get resources by lesson',
        'GET /api/resources/:resourceId': 'Get resource by ID',
        'POST /api/resources': 'Create resource (Admin)',
        'PUT /api/resources/:resourceId': 'Update resource (Admin)',
        'DELETE /api/resources/:resourceId': 'Delete resource (Admin)',
        'GET /api/resources/type/:type': 'Get resources by type',
        'GET /api/resources/search': 'Search resources',
        'POST /api/resources/lesson/:lessonId/bulk': 'Bulk create resources (Admin)',
      },
      instructors: {
        'GET /api/instructors': 'Get all instructors',
        'GET /api/instructors/:instructorId': 'Get instructor by ID',
        'POST /api/instructors': 'Create instructor (Admin)',
        'PUT /api/instructors/:instructorId': 'Update instructor (Admin)',
        'DELETE /api/instructors/:instructorId': 'Delete instructor (Admin)',
        'GET /api/instructors/:instructorId/lessons': 'Get instructor lessons',
        'GET /api/instructors/:instructorId/stats': 'Get instructor statistics',
        'GET /api/instructors/search/expertise': 'Search instructors by expertise',
      },
    },
    authentication: {
      type: 'JWT Bearer Token',
      header: 'Authorization: Bearer <token>',
      cookie: 'jwt=<token>',
      session: 'Passport session support',
    },
    roles: {
      STUDENT: 'Default role for regular users',
      ADMIN: 'Administrative role with full access',
    },
  });
});

export default router;