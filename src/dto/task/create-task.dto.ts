import { z } from "zod";
export const createTaskDto = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  dueDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional(),
  boardId: z.string().uuid().optional(),
  creatorId: z.string().uuid("Invalid creator ID"),
});
