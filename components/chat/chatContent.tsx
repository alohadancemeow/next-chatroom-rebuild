"use client";

import React, { useEffect, useRef, useState } from "react";
import { CirclePlus, Send, SmilePlus } from "lucide-react";
import Message from "./message";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

import EmojiPicker from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "@/states/chat-store";
import { MessageSchema } from "@/types";
import { useUserStore } from "@/states/user-store";
import { db } from "@/lib/firebase";
import useSearchModal from "@/states/search-modal";
import { messageValidator } from "../helpers/validator";

type Props = {};

const ChatContent = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chatMessage, setChatMessage] = useState<MessageSchema[]>([]);

  const searchModal = useSearchModal();
  const { currentUser } = useUserStore();
  const { chatId, receiverId, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef<HTMLDivElement>(null);

  const handleEmoji = (e: any) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (!chatId || !currentUser?.id || !text) return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          isSeen: false,
          createdAt: Date.now(),
        }),
      });

      const userIDs = [currentUser.id, receiverId];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c: any) => c.chatId === chatId
          );

          // read chat
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setText("");
    }
  };

  /* This `useEffect` hook is responsible for subscribing to real-time updates for the chat messages
    in the Firestore database. */
  useEffect(() => {
    if (!currentUser?.id || !chatId) return;

    setChatMessage([]);

    const unSub = onSnapshot(doc(db, "chats", chatId), async (res) => {
      const items = res?.data()?.messages || [];

      if (!items.length) return;

      const promises = items.map(async (item: any) => {
        const validatedMessage = messageValidator(item);
        if (!validatedMessage?.data) return;

        return validatedMessage;
      });

      const messages = (await Promise.all(promises)).filter(Boolean);
      const validatedMessages = messages.map(
        (item) => ({ ...item.data } as MessageSchema)
      );

      setChatMessage(validatedMessages);
    });

    return () => unSub();
  }, [chatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessage]);

  return (
    <div className="flex flex-grow max-w-[63%] rounded p-5 border border-r-[#ebe7fb] flex-col justify-start">
      {!chatId && (
        <div className="flex flex-col gap-2 justify-center items-center h-full">
          <div className="text-4xl font-bold flex flex-col items-center gap-1">
            <p className="text-5xl">👋</p>
            <p>Get started</p>
          </div>
          <Button variant="outline" onClick={() => searchModal.onOpen()}>
            <CirclePlus />
          </Button>
        </div>
      )}
      {chatId && (
        <div className="flex flex-col justify-between">
          <ScrollArea className="h-[520px] xl:h-[530px]">
            {chatMessage.map((item, index) => (
              <Message
                key={index}
                message={item}
                isSender={item.senderId === currentUser?.id}
              />
            ))}
            <div ref={endRef}></div>
          </ScrollArea>

          <div className="absolute right-[50%] bottom-[21%]">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>

          <div className="pt-5">
            <div className="bg-white flex p-2 rounded-lg gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen((prev) => !prev)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
              >
                <SmilePlus />
              </Button>
              <Input
                type="text"
                placeholder={
                  isCurrentUserBlocked || isReceiverBlocked
                    ? "You cannot send a message"
                    : "Type a message..."
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
              />
              <Button
                variant="outline"
                onClick={handleSend}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
              >
                <Send />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContent;
