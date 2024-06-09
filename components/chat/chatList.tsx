"use client";

import { LogOut, Search } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import ChatItem from "./chatItem";
import useSearchModal from "@/states/search-modal";
import UserDialog from "../search/userDialog";

import { auth, db } from "@/lib/firebase";
import useGetUsers from "@/hooks/use-get-users";
import { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useUserStore } from "@/states/user-store";
import { chatSchema, ChatShcema, ChatWithUser, userSchema } from "@/types";
import { useChatStore } from "@/states/chat-store";

type Props = {};

const ChatList = (props: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);

  console.log("chats", chats);

  const searchModal = useSearchModal();
  const { users } = useGetUsers();
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  /**
   * The function `handleSelect` updates the `isSeen` property of a chat message in a user's chats
   * list and then updates the user's chats in a Firestore database.
   */
  const handleSelected = async (chat: ChatWithUser) => {
    if (!currentUser?.id) return;

    const chatIndex = chats.findIndex((item) => item.chatId === chat.chatId);
    if (chatIndex === -1) return; // Ensure the chat exists

    // chats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    // Find the chat to update
    const chatToUpdate = chats[chatIndex];

    try {
      if (chatToUpdate) {
        // Update the specific chat object
        const updatedChat = {
          ...chatToUpdate,
          isSeen: true,
          updatedAt: Date.now(),
        }

        // Create a new array with the updated chat
        const updatedChats = [
          ...chats.slice(0, chatIndex),
          updatedChat,
          ...chats.slice(chatIndex + 1),
        ]

        // Update the entire chats array in Firestore
        await updateDoc(userChatsRef, {
          chats: updatedChats,
        });

        // Update the local state
        setChats(updatedChats);
        changeChat(updatedChat);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* This `useEffect` hook is responsible for fetching and updating the chat data for the current
    user. Here's a breakdown of what it does: */
  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(
      doc(db, "userchats", currentUser?.id!),
      async (res) => {
        const items = res?.data()?.chats || [];

        if (!items.length) return;

        const promises = items.map(async (item: any) => {
          // console.log(item, "item");

          // Validate the item against the schema
          const validatedItem = chatSchema.safeParse(item);
          if (!validatedItem.success) {
            console.error("Invalid item:", validatedItem.error);
            return null;
          }

          const userDocRef = doc(db, "users", validatedItem.data.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          // Validate the user data against the user schema
          const userData = userDocSnap.data();
          const validatedUser = userSchema.safeParse(userData);
          if (!validatedUser.success) {
            console.error("Invalid user data:", validatedUser.error);
            return null;
          }

          const user = validatedUser.data;

          return {
            ...validatedItem.data,
            avatar: user.avatar,
            username: user.username,
            blocked: user.blocked,
          } as ChatWithUser;
        });

        const chatData = (await Promise.all(promises)).filter(
          Boolean
        ) as ChatWithUser[];

        setChats(
          chatData.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
        );
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser?.id!]);

  return (
    <div className="w-[25%] mb-5 mr-2 flex flex-col gap-6 justify-between">
      <Button
        onClick={() => searchModal.onOpen()}
        className="shadow-sm gap-2 w-full"
        variant="default"
      >
        <Search />
        <div>Find more friends</div>
      </Button>

      <ScrollArea className="xl:h-[510px] h-[490px]">
        {chats.map((chat) => (
          <ChatItem
            key={chat.chatId}
            chat={chat}
            handleSelected={handleSelected}
          />
        ))}
      </ScrollArea>

      <Button
        className="shadow-sm gap-2 w-full hover:bg-red-700"
        variant="outline"
        onClick={() => auth.signOut()}
      >
        <LogOut />
        <div>Leave ChatRoom</div>
      </Button>

      <UserDialog users={users} />
    </div>
  );
};

export default ChatList;
