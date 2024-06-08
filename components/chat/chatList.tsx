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
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserStore } from "@/states/user-store";
import { chatSchema, ChatWithUser, userSchema } from "@/types";

type Props = {};

const ChatList = (props: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);

  console.log("chats", chats);

  const searchModal = useSearchModal();
  const { users } = useGetUsers();
  const { currentUser } = useUserStore();

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
          // Validate the item against the schema
          const validatedItem = chatSchema.safeParse(item);
          if (!validatedItem.success) {
            console.error("Invalid item:", validatedItem.error);
            return null; // or handle the invalid item appropriately
          }

          const userDocRef = doc(db, "users", validatedItem.data.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          // Validate the user data against the user schema
          const userData = userDocSnap.data();
          const validatedUser = userSchema.safeParse(userData);
          if (!validatedUser.success) {
            console.error("Invalid user data:", validatedUser.error);
            return null; // or handle the invalid user data appropriately
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
        {
          //todo: map joined users
          chats.map((chat) => (
            <ChatItem key={chat.chatId} chat={chat} />
          ))
        }
      </ScrollArea>

      <Button
        className="shadow-sm gap-2 w-full hover:bg-red-700"
        variant="outline"
        onClick={() => {
          auth.signOut();
          // resetChat();
        }}
      >
        <LogOut />
        <div>Leave ChatRoom</div>
      </Button>

      <UserDialog users={users} />
    </div>
  );
};

export default ChatList;
