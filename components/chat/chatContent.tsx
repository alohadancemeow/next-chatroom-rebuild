"use client";

import React, { useState } from "react";
import { Send, SmilePlus } from "lucide-react";
import ChatItem from "./chatItem";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const messages = [
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
    message: "this is a message, this is a message, this is a message, this is a message",
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
];

type Props = {};

const ChatContent = (props: Props) => {
  const [state, setState] = useState({
    username: "username",
    message: "",
    fileName: "",
  });

  const [userId, setUserId] = useState();

  const [file, setFile] = useState();

  // # State for socket messages
  const [chatMessage, setChatMessage] = useState([]);

  const selectedFile = (e: any) => {};
  const handleOnChange = (e: any) => {};
  const emitMessage = (e: any) => {};

  return (
    <div className="flex flex-grow max-w-[63%] rounded p-5 border border-r-[#ebe7fb] flex-col justify-start">
      <div className="flex flex-col justify-between">
        <ScrollArea className="h-[530px] xl:h-[540px]">
          {messages.map((item, index) => (
            <ChatItem key={index} message={item} />
          ))}
        </ScrollArea>

        <div className="pt-5">
          <div className="bg-white flex p-2 rounded-lg gap-2">
            <Button variant="outline" size="icon">
              <SmilePlus />
            </Button>
            <Input type="text" placeholder="type a message" />
            <Button variant="outline" size="icon">
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
