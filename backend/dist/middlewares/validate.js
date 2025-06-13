"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../types");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
            field: error.type === 'field' ? error.path : 'unknown',
            message: error.msg,
            value: error.type === 'field' ? error.value : undefined,
        }));
        const error = new types_1.AppError('Validation failed', 400);
        error.details = errorMessages;
        return next(error);
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map