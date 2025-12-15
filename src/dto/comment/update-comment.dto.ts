import z from "zod";

export const updateCommentDto = z.object({
  content: z
    .string()
    .min(1, "Comment content is required")
    .max(1000, "Comment is too long"),
});

export type UpdateCommentDto = z.infer<typeof updateCommentDto>;
