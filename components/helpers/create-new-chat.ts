import { db } from "@/lib/firebase";
import { UserSchema } from "@/types";
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type Props = {
  userChatDocRef: DocumentReference<DocumentData, DocumentData>;
  currentUserChatDocRef: DocumentReference<DocumentData, DocumentData>;
  sender: UserSchema;
  reciever: UserSchema;
};

export const createNewChat = async ({
  currentUserChatDocRef,
  userChatDocRef,
  reciever,
  sender,
}: Props) => {
  const chatRef = collection(db, "chats");
  const newChatRef = doc(chatRef);

  await setDoc(newChatRef, {
    createdAt: serverTimestamp(),
    messages: [],
  });

  // Update the new user's chat list
  await updateDoc(userChatDocRef, {
    chats: arrayUnion({
      chatId: newChatRef.id,
      isSeen: false,
      lastMessage: "",
      receiverId: sender?.id!,
      updatedAt: Date.now(),
    }),
  });

  // Update the current user's chat list
  await updateDoc(currentUserChatDocRef, {
    chats: arrayUnion({
      chatId: newChatRef.id,
      isSeen: false,
      lastMessage: "",
      receiverId: reciever.id,
      updatedAt: Date.now(),
    }),
  });
};
