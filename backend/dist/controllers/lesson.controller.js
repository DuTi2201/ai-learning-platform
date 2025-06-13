"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const lesson_service_1 = require("../services/lesson.service");
const errorHandler_1 = require("../middlewares/errorHandler");
class LessonController {
}
exports.LessonController = LessonController;
_a = LessonController;
LessonController.getAllLessons = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const lessons = await lesson_service_1.LessonService.getAllLessons();
    const response = {
        success: true,
        message: 'All lessons retrieved successfully',
        data: lessons,
    };
    res.json(response);
});
LessonController.getRecentLessons = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const lessons = await lesson_service_1.LessonService.getRecentLessons();
    const response = {
        success: true,
        message: 'Recent lessons retrieved successfully',
        data: lessons,
    };
    res.json(response);
});
LessonController.getLessonsByModule = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { moduleId } = req.params;
    const userId = req.user?.id;
    const lessons = await lesson_service_1.LessonService.getLessonsByModule(moduleId, userId);
    const response = {
        success: true,
        message: 'Lessons retrieved successfully',
        data: lessons,
    };
    res.json(response);
});
LessonController.getLessonById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    const userId = req.user?.id;
    const lesson = await lesson_service_1.LessonService.getLessonById(lessonId, userId);
    const response = {
        success: true,
        message: 'Lesson retrieved successfully',
        data: lesson,
    };
    res.json(response);
});
LessonController.createLesson = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const lessonData = req.body;
    const lesson = await lesson_service_1.LessonService.createLesson(lessonData);
    const response = {
        success: true,
        message: 'Lesson created successfully',
        data: lesson,
    };
    res.status(201).json(response);
});
LessonController.updateLesson = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    const updateData = req.body;
    const lesson = await lesson_service_1.LessonService.updateLesson(lessonId, updateData);
    const response = {
        success: true,
        message: 'Lesson updated successfully',
        data: lesson,
    };
    res.json(response);
});
LessonController.deleteLesson = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    await lesson_service_1.LessonService.deleteLesson(lessonId);
    const response = {
        success: true,
        message: 'Lesson deleted successfully',
    };
    res.json(response);
});
LessonController.updateLessonProgress = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { lessonId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    const progress = await lesson_service_1.LessonService.updateLessonProgress(userId, lessonId, status);
    const response = {
        success: true,
        message: 'Lesson progress updated successfully',
        data: progress,
    };
    res.json(response);
});
LessonController.getUserLessonProgress = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;
    const progress = await lesson_service_1.LessonService.getUserLessonProgress(userId, courseId);
    const response = {
        success: true,
        message: 'Lesson progress retrieved successfully',
        data: progress,
    };
    res.json(response);
});
LessonController.reorderLessons = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { moduleId } = req.params;
    const { lessonOrders } = req.body;
    await lesson_service_1.LessonService.reorderLessons(moduleId, lessonOrders);
    const response = {
        success: true,
        message: 'Lessons reordered successfully',
    };
    res.json(response);
});
//# sourceMappingURL=lesson.controller.js.map