"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.EnrollmentType = exports.LessonStatus = exports.ResourceType = exports.UserRole = void 0;
const prisma_1 = require("../generated/prisma");
Object.defineProperty(exports, "UserRole", { enumerable: true, get: function () { return prisma_1.UserRole; } });
Object.defineProperty(exports, "ResourceType", { enumerable: true, get: function () { return prisma_1.ResourceType; } });
Object.defineProperty(exports, "LessonStatus", { enumerable: true, get: function () { return prisma_1.LessonStatus; } });
Object.defineProperty(exports, "EnrollmentType", { enumerable: true, get: function () { return prisma_1.EnrollmentType; } });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=index.js.map