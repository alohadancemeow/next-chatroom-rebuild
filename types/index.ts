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

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  status: z.string().max(30, {
    message: "Status must not be longer than 30 characters.",
  }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const chatSchema = z.object({
  chatId: z.string(),
  isSeen: z.boolean(),
  lastMessage: z.string().optional(),
  receiverId: z.string(),
  updatedAt: z.coerce.date(),
});

export type ChatShcema = z.infer<typeof chatSchema>;

export type ChatWithUser = ChatShcema &
  Pick<UserSchema, "avatar" | "username" | "blocked">;
