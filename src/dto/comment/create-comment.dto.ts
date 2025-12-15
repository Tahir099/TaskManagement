import { z } from "zod";

export const createCommentDto = z.object({
  content: z
    .string()
    .min(1, "Comment content is required ")
    .max(1000, "comment is too long"),
  taskId: z.string().uuid("Invalid task ID"),
});

export type CreateCommentDto = z.infer<typeof createCommentDto>;
