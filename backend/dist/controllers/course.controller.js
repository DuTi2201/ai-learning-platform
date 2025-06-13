"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const course_service_1 = require("../services/course.service");
const errorHandler_1 = require("../middlewares/errorHandler");
class CourseController {
}
exports.CourseController = CourseController;
_a = CourseController;
CourseController.getAllCourses = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id;
    const result = await course_service_1.CourseService.getAllCourses(req.query, userId);
    const response = {
        success: true,
        message: 'Courses retrieved successfully',
        data: result.courses,
        pagination: {
            ...result.pagination,
            hasNext: result.pagination.page < result.pagination.totalPages
        },
    };
    res.json(response);
});
CourseController.getCourseById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user?.id;
    const course = await course_service_1.CourseService.getCourseById(courseId, userId);
    const response = {
        success: true,
        message: 'Course retrieved successfully',
        data: course,
    };
    res.json(response);
});
CourseController.createCourse = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const courseData = req.body;
    const createdById = req.user.id;
    const course = await course_service_1.CourseService.createCourse(courseData, createdById);
    const response = {
        success: true,
        message: 'Course created successfully',
        data: course,
    };
    res.status(201).json(response);
});
CourseController.updateCourse = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const updateData = req.body;
    const course = await course_service_1.CourseService.updateCourse(courseId, updateData);
    const response = {
        success: true,
        message: 'Course updated successfully',
        data: course,
    };
    res.json(response);
});
CourseController.deleteCourse = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    await course_service_1.CourseService.deleteCourse(courseId);
    const response = {
        success: true,
        message: 'Course deleted successfully',
    };
    res.json(response);
});
CourseController.enrollInCourse = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;
    const enrollment = await course_service_1.CourseService.enrollUser(userId, courseId);
    const response = {
        success: true,
        message: 'Successfully enrolled in course',
        data: enrollment,
    };
    res.status(201).json(response);
});
CourseController.unenrollFromCourse = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;
    await course_service_1.CourseService.unenrollUser(userId, courseId);
    const response = {
        success: true,
        message: 'Successfully unenrolled from course',
    };
    res.json(response);
});
CourseController.getMyEnrolledCourses = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user.id;
    const enrollments = await course_service_1.CourseService.getUserEnrolledCourses(userId);
    const response = {
        success: true,
        message: 'Enrolled courses retrieved successfully',
        data: enrollments,
    };
    res.json(response);
});
//# sourceMappingURL=course.controller.js.map