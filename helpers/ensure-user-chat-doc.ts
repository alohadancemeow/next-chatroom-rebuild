import { db } from "@/lib/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const ensureUserChatDoc = async (userId: string) => {
  const userChatsRef = collection(db, "userchats");

  const userChatDocRef = doc(userChatsRef, userId);
  const userChatDocSnap = await getDoc(userChatDocRef);

  if (!userChatDocSnap.exists()) {
    await setDoc(userChatDocRef, { chats: [] });
  }
  return userChatDocRef;
};
