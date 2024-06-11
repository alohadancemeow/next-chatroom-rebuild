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
  updateDoc,
} from "firebase/firestore";
import { useUserStore } from "@/states/user-store";
import { ChatWithUser } from "@/types";
import { useChatStore } from "@/states/chat-store";
import { combineChatWithUser } from "../../helpers/combine-chat-with-user";

type Props = {};

const ChatList = (props: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);

  const searchModal = useSearchModal();
  const { users } = useGetUsers();
  const { currentUser } = useUserStore();
  const { changeChat, resetChat } = useChatStore();

  const handleLeave = () => {
    auth.signOut();
    resetChat();
  };

  /**
   * The function `handleSelect` updates the `isSeen` property of a chat message in a user's chats
   * list and then updates the user's chats in a Firestore database.
   */
  const handleSelected = async (chat: ChatWithUser) => {
    if (!currentUser?.id) return;

    // Fetch the document
    const userChatsRef = doc(db, "userchats", currentUser.id);
    const docSnap = await getDoc(userChatsRef);

    try {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const chats = data.chats || [];

        // Find the chat to update
        const chatIndex = chats.findIndex(
          (item: any) => item.chatId === chat.chatId
        );
        if (chatIndex === -1) return;
        const chatToUpdate = chats[chatIndex];

        if (chatToUpdate.isSeen) {
          const chatWithUser = await combineChatWithUser(chatToUpdate);
          if (!chatWithUser) return;

          return changeChat(chatWithUser);
        }

        if (chatToUpdate) {
          const updatedChat = {
            ...chatToUpdate,
            isSeen: true,
            updatedAt: Date.now(),
          };

          // Remove the old chat and add the updated one
          await updateDoc(userChatsRef, {
            chats: arrayRemove(chatToUpdate),
          });
          await updateDoc(userChatsRef, {
            chats: arrayUnion(updatedChat),
          });

          const chatWithUser = await combineChatWithUser(chatToUpdate);
          if (!chatWithUser) return;

          return changeChat(chatWithUser);
        } else {
          console.error("Chat not found");
        }
      } else {
        console.error("Document does not exist");
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
          const chatWithUser = await combineChatWithUser(item);
          if (!chatWithUser) return;

          return chatWithUser;
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
  }, []);

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
        onClick={handleLeave}
      >
        <LogOut />
        <div>Leave ChatRoom</div>
      </Button>

      <UserDialog users={users} />
    </div>
  );
};

export default ChatList;
