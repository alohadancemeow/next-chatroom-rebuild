import { db } from "@/lib/firebase";
import { chatValidator, userValidator } from "./validator";
import { doc, getDoc } from "firebase/firestore";
import { ChatWithUser } from "@/types";

const getUserSnapshot = async (userId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDocRef);
  const userData = userDocSnap.data();

  return userData;
};

export const combineChatWithUser = async (chatData: any) => {
  const validatedChat = chatValidator(chatData);
  if (!validatedChat?.data) return;

  const userData = await getUserSnapshot(validatedChat.data.receiverId);

  const validatedUser = userValidator(userData);
  if (!validatedUser?.data) return;

  const chatWithUser = {
    ...validatedChat.data,
    avatar: validatedUser.data.avatar,
    username: validatedUser.data.username,
    blocked: validatedUser.data.blocked,
  } as ChatWithUser;

  return chatWithUser;
};
