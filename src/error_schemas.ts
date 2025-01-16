import { z } from "zod";

export const commonExceptionResponseSchema = z.object({
  message: z.string(),
  error: z
    .object({
      name: z.string(),
      message: z.string(),
      stack: z.string().optional(),
    })
    .optional(),
});

export type CommonExceptionResponse = z.infer<typeof commonExceptionResponseSchema>;
