"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_schemas_1 = require("./error_schemas");
const errorHandler = (message, error) => {
    const errorRes = {
        message,
    };
    if (!error) {
        return error_schemas_1.commonExceptionResponseSchema.parse(errorRes);
    }
    if (error instanceof Error) {
        errorRes.error = {
            name: error.name,
            message: error.message,
            stack: error.stack || "",
        };
    }
    else if (typeof error === "string") {
        errorRes.error = {
            name: "string_error",
            message: error,
        };
    }
    else if (typeof error === "object" && error !== null) {
        errorRes.error = {
            name: "object_error",
            message: JSON.stringify(error),
        };
    }
    else {
        errorRes.error = {
            name: "unknown_error",
            message: "An unknown error occurred",
        };
    }
    return error_schemas_1.commonExceptionResponseSchema.parse(errorRes);
};
exports.errorHandler = errorHandler;
