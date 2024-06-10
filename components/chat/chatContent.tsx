"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, SmilePlus } from "lucide-react";
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
import { messageSchema, MessageSchema } from "@/types";
import { useUserStore } from "@/states/user-store";
import { db } from "@/lib/firebase";

type Props = {};

const ChatContent = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chatMessage, setChatMessage] = useState<MessageSchema[]>([]);

  const { currentUser } = useUserStore();
  const { chatId, receiverId } = useChatStore();

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

        const messageRef = doc(db, "chats", chatId);
        const messageSnapshot = await getDoc(messageRef);

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

        // read message
        if (messageSnapshot.exists()) {
          const messageData = messageSnapshot.data();

          const messageIndex = messageData.messages.findIndex(
            (c: any) => c.senderId !== id
          );
          if (messageIndex === -1) return;

          messageData.messages[messageIndex].isSeen =
            id !== currentUser.id ? true : false;

          await updateDoc(userChatsRef, {
            messages: messageData.messages,
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
        // console.log(item, "item");

        const validatedItem = messageSchema.safeParse(item);
        if (!validatedItem.success) {
          console.error("Invalid item:", validatedItem.error);
          return null;
        }

        return validatedItem;
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
      <div className="flex flex-col justify-between">
        <ScrollArea className="h-[530px] xl:h-[540px]">
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
            <Button variant="outline" onClick={() => setOpen((prev) => !prev)}>
              <SmilePlus />
            </Button>
            <Input
              type="text"
              // placeholder={
              //   isCurrentUserBlocked || isReceiverBlocked
              //     ? "You cannot send a message"
              //     : "Type a message..."
              // }
              placeholder="Type a message.."
              value={text}
              onChange={(e) => setText(e.target.value)}
              // disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
            <Button variant="outline" onClick={handleSend}>
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
