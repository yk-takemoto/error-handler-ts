import { z } from "zod";
export declare const commonExceptionResponseSchema: z.ZodObject<{
    message: z.ZodString;
    error: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        message: z.ZodString;
        stack: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        name: string;
        stack?: string | undefined;
    }, {
        message: string;
        name: string;
        stack?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    message: string;
    error?: {
        message: string;
        name: string;
        stack?: string | undefined;
    } | undefined;
}, {
    message: string;
    error?: {
        message: string;
        name: string;
        stack?: string | undefined;
    } | undefined;
}>;
export type CommonExceptionResponse = z.infer<typeof commonExceptionResponseSchema>;
