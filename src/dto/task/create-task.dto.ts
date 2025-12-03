import { z } from "zod";
export const createTaskDto = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().optional(),
  status: z
    .enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"])
    .optional()
    .default("TODO"),
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
    .optional()
    .default("MEDIUM"),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .transform((str) => (str ? new Date(str) : undefined)),
  boardId: z.string().uuid("Invalid board ID"),
});
