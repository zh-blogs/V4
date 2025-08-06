import { z } from "zod/v4";

export const SuccessResultSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.any().optional(),
  timestamp: z.iso.datetime(),
});

export const ErrorResultSchema = z.object({
  success: z.literal(false),
  status: z.number(),
  message: z.string(),
  timestamp: z.iso.datetime(),
});

export type SuccessResult = z.infer<typeof SuccessResultSchema>;
export type ErrorResult = z.infer<typeof ErrorResultSchema>;
