"use client";

import { LogOut, Search, Settings } from "lucide-react";
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
import { ChatWithUser, ChatSchema } from "@/types";
import { useChatStore } from "@/states/chat-store";
import { combineChatWithUser } from "../../helpers/combine-chat-with-user";
import useSettingsModal from "@/states/settings-modal";
import SettingsDialog from "../settings/settings-dialog";
import { Input } from "../ui/input";

type Props = {};

const ChatList = (props: Props) => {
  const [chats, setChats] = useState<ChatWithUser[]>([]);

  const searchModal = useSearchModal();
  const settingsModal = useSettingsModal();
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
          (item: ChatSchema) => item.chatId === chat.chatId
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

        const promises = items.map(async (item: unknown) => {
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
    <div className="flex flex-col h-full w-full p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div
          onClick={() => resetChat()}
          className="flex items-center justify-center cursor-pointer gap-2"
        >
          <div className="rounded-full p-1.5">
            <img src="/chat.svg" alt="logo" className="w-12 h-12" />
          </div>
          <p className="text-xl font-bold tracking-tight">Let’s Chat</p>
        </div>

        <div
          className="cursor-pointer p-2 hover:bg-slate-100 rounded-full transition-colors"
          onClick={() => settingsModal.onOpen()}
        >
          <Settings className="w-5 h-5 text-slate-500" />
        </div>
        <SettingsDialog />
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Find more friends"
          className="bg-slate-50 border-none rounded-2xl pl-10 h-12"
          onClick={() => searchModal.onOpen()}
          readOnly
        />
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-grow -mx-2 px-2">
        <div className="flex flex-col gap-1">
          {chats.map((chat) => (
            <ChatItem
              key={chat.chatId}
              chat={chat}
              handleSelected={handleSelected}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Leave Button */}
      <div className="mt-4 pt-4 border-t border-slate-50">
        <Button
          className="w-full gap-2 rounded-2xl h-12 border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50"
          variant="outline"
          onClick={handleLeave}
        >
          <LogOut size={18} />
          <div>Leave ChatRoom</div>
        </Button>
      </div>

      <UserDialog users={users} />
    </div>
  );
};

export default ChatList;
