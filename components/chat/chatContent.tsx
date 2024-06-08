"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, SmilePlus } from "lucide-react";
import Message from "./message";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

import EmojiPicker from "emoji-picker-react";

type Props = {};

const ChatContent = (props: Props) => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const [chatMessage, setChatMessage] = useState([
    {
      name: "user1",
      message: "this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user2",
      message: "this is a message, this is a message, this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user3",
      message: "this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user1",
      message:
        "this is a message, this is a message, this is a message, this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user5",
      message: "this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user1",
      message:
        "this is a message, this is a message, this is a message, this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user5",
      message: "this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user1",
      message: "this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user5",
      message: "this is a message",
      momentTime: "2024-06-04",
    },
    {
      name: "user1",
      message: "this is a message",
      momentTime: "2024-06-04",
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  const handleEmoji = (e: any) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = () => {
    setChatMessage([
      ...chatMessage,
      {
        message: text,
        momentTime: "2024-06-04",
        name: "user1",
      },
    ]);

    setText("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessage]);

  return (
    <div className="flex flex-grow max-w-[63%] rounded p-5 border border-r-[#ebe7fb] flex-col justify-start">
      <div className="flex flex-col justify-between">
        <ScrollArea className="h-[530px] xl:h-[540px]">
          {chatMessage.map((item, index) => (
            <Message key={index} message={item} />
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
