"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = exports.PrismaClient = exports.LessonStatus = exports.ResourceType = exports.UserRole = exports.$Enums = void 0;
const runtime = __importStar(require("./runtime/library.js"));
var $Enums;
(function ($Enums) {
})($Enums || (exports.$Enums = $Enums = {}));
class PrismaClient {
    get user() { }
    get course() { }
    get module() { }
    get instructor() { }
    get lesson() { }
    get resource() { }
    get enrollment() { }
    get lessonProgress() { }
    get session() { }
}
exports.PrismaClient = PrismaClient;
var Prisma;
(function (Prisma) {
    Prisma.DMMF = runtime.DMMF;
    Prisma.validator = runtime.Public.validator;
    Prisma.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
    Prisma.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
    Prisma.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
    Prisma.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
    Prisma.PrismaClientValidationError = runtime.PrismaClientValidationError;
    Prisma.sql = runtime.sqltag;
    Prisma.empty = runtime.empty;
    Prisma.join = runtime.join;
    Prisma.raw = runtime.raw;
    Prisma.Sql = runtime.Sql;
    Prisma.Decimal = runtime.Decimal;
    Prisma.getExtensionContext = runtime.Extensions.getExtensionContext;
    let NullTypes;
    (function (NullTypes) {
        class DbNull {
        }
        class JsonNull {
        }
        class AnyNull {
        }
    })(NullTypes || (NullTypes = {}));
})(Prisma || (exports.Prisma = Prisma = {}));
//# sourceMappingURL=index.d%202.js.map