"use client";

import React, { useEffect, useRef, useState } from "react";
import { CirclePlus, MoreVertical, Paperclip, Search, Send, SmilePlus } from "lucide-react";
import Message from "./message";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "@/states/chat-store";
import { MessageSchema, ChatSchema } from "@/types";
import { useUserStore } from "@/states/user-store";
import { db } from "@/lib/firebase";
import useSearchModal from "@/states/search-modal";
import { messageValidator } from "../../helpers/validator";

const ChatContent = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chatMessage, setChatMessage] = useState<MessageSchema[]>([]);

  const searchModal = useSearchModal();
  const { currentUser } = useUserStore();
  const { chatId, receiverId, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();

  const endRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleEmoji = (e: EmojiClickData) => {
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
            (c: ChatSchema) => c.chatId === chatId
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

      const promises = items.map(async (item: unknown) => {
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

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedOutsidePicker =
        pickerRef.current && !pickerRef.current.contains(target);
      const clickedOutsideToggle =
        toggleRef.current && !toggleRef.current.contains(target);
      if (clickedOutsidePicker && clickedOutsideToggle) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex flex-col h-full w-full justify-start relative">
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
        <div className="flex flex-col justify-between h-full relative">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">Private Chat</h2>
              <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </div>
            {/* <div className="flex items-center gap-4 text-slate-400">
              <Search className="w-5 h-5 cursor-pointer hover:text-slate-600" />
              <MoreVertical className="w-5 h-5 cursor-pointer hover:text-slate-600" />
            </div> */}
          </div>

          <ScrollArea className="flex-grow px-6 bg-white">
            <div className="py-6 flex flex-col gap-6">
              {chatMessage.map((item, index) => (
                <Message
                  key={index}
                  message={item}
                  isSender={item.senderId === currentUser?.id}
                />
              ))}
              <div ref={endRef}></div>
            </div>
          </ScrollArea>

          <div ref={pickerRef} className="absolute bottom-24 left-6 z-10">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>

          <div className="p-6 bg-white border-t border-slate-50">
            <div className="bg-slate-50 flex items-center p-2 rounded-2xl gap-2">
              <Button
                ref={toggleRef}
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-600 hover:bg-transparent"
                onClick={() => setOpen((prev) => !prev)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
              >
                <SmilePlus className="w-6 h-6" />
              </Button>
              {/* <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-slate-600 hover:bg-transparent"
                disabled={isCurrentUserBlocked || isReceiverBlocked}
              >
                <Paperclip className="w-5 h-5" />
              </Button> */}
              <Input
                type="text"
                className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 text-slate-600"
                placeholder={
                  isCurrentUserBlocked || isReceiverBlocked
                    ? "You cannot send a message"
                    : "Type a message..."
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <Button
                // size="icon"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200"
                onClick={handleSend}
                disabled={isCurrentUserBlocked || isReceiverBlocked || !text}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContent;
