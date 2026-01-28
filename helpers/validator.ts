import { chatSchema, messageSchema, userSchema } from "@/types";

export const chatValidator = (item: unknown) => {
  const validatedChat = chatSchema.safeParse(item);
  if (!validatedChat.success) {
    console.error("Invalid chat data:", validatedChat.error);
    return null;
  }
  return validatedChat;
};

export const userValidator = (item: unknown) => {
  const validatedUser = userSchema.safeParse(item);
  if (!validatedUser.success) {
    console.error("Invalid user data:", validatedUser.error);
    return null;
  }
  return validatedUser;
};

export const messageValidator = (item: unknown) => {
  const validatedMessage = messageSchema.safeParse(item);
  if (!validatedMessage.success) {
    console.error("Invalid message data:", validatedMessage.error);
    return null;
  }
  return validatedMessage;
};
