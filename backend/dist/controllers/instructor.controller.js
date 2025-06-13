"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorController = void 0;
const instructor_service_1 = require("../services/instructor.service");
const errorHandler_1 = require("../middlewares/errorHandler");
class InstructorController {
}
exports.InstructorController = InstructorController;
_a = InstructorController;
InstructorController.getAllInstructors = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const result = await instructor_service_1.InstructorService.getAllInstructors({
        page: parseInt(page),
        limit: parseInt(limit),
        search: search,
    });
    const response = {
        success: true,
        message: 'Instructors retrieved successfully',
        data: result.data,
        pagination: result.pagination,
    };
    res.json(response);
});
InstructorController.getInstructorById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { instructorId } = req.params;
    const instructor = await instructor_service_1.InstructorService.getInstructorById(instructorId);
    const response = {
        success: true,
        message: 'Instructor retrieved successfully',
        data: instructor,
    };
    res.json(response);
});
InstructorController.createInstructor = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const instructorData = req.body;
    const instructor = await instructor_service_1.InstructorService.createInstructor(instructorData);
    const response = {
        success: true,
        message: 'Instructor created successfully',
        data: instructor,
    };
    res.status(201).json(response);
});
InstructorController.updateInstructor = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { instructorId } = req.params;
    const updateData = req.body;
    const instructor = await instructor_service_1.InstructorService.updateInstructor(instructorId, updateData);
    const response = {
        success: true,
        message: 'Instructor updated successfully',
        data: instructor,
    };
    res.json(response);
});
InstructorController.deleteInstructor = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { instructorId } = req.params;
    await instructor_service_1.InstructorService.deleteInstructor(instructorId);
    const response = {
        success: true,
        message: 'Instructor deleted successfully',
    };
    res.json(response);
});
InstructorController.getInstructorLessons = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { instructorId } = req.params;
    const lessons = await instructor_service_1.InstructorService.getInstructorLessons(instructorId);
    const response = {
        success: true,
        message: 'Instructor lessons retrieved successfully',
        data: lessons,
    };
    res.json(response);
});
InstructorController.getInstructorStats = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { instructorId } = req.params;
    const stats = await instructor_service_1.InstructorService.getInstructorStats(instructorId);
    const response = {
        success: true,
        message: 'Instructor statistics retrieved successfully',
        data: stats,
    };
    res.json(response);
});
//# sourceMappingURL=instructor.controller.js.map