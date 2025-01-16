"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonExceptionResponseSchema = void 0;
const zod_1 = require("zod");
exports.commonExceptionResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
    error: zod_1.z
        .object({
        name: zod_1.z.string(),
        message: zod_1.z.string(),
        stack: zod_1.z.string().optional(),
    })
        .optional(),
});
