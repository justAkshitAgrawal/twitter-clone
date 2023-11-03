import { z } from "zod";

export const PostValidator = z.object({
  tweet: z.string().min(1).max(255),
});

export type PostType = z.infer<typeof PostValidator>;
