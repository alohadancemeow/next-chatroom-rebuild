import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  status: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().email(),
  blocked: z.string().array().optional(),
  links: z.string().array().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
