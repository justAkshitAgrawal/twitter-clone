import { z } from "zod";

export const ProfileValidator = z.object({
  username: z.string().min(1).max(25),
  bio: z.string().max(160).optional(),
});

export type ProfileType = z.infer<typeof ProfileValidator>;
