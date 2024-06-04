"use client";

import { Plus, Send } from "lucide-react";
import React, { useState } from "react";
import ChatItem from "./chatItem";
import { Button } from "../ui/button";

const messages = [
  {
    name: "user1",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user2",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user3",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user4",
    message: "this is a message",
    momentTime: "2024-06-04",
  },
  {
    name: "user5",
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
    <div className="flex flex-grow max-w-[63%] p-5 border border-r-[#ebe7fb] flex-col justify-start">
      <div className="mb-2 border-b-[#ebe7fb] flex justify-between items-center text-center">
        <div className="text-center">
          <h3 className="mt-1 mb-4 text-[#607d8b]">WE NEED TO TALK</h3>
        </div>
      </div>

      <div className="flex flex-col justify-between h-full max-h-[65vh]">
        <div className="h-full max-h-[90%]">
          <div className="h-full w-full overflow-y-scroll">
            <div>
              {messages.map((item, index) => (
                <ChatItem key={index} message={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="bg-white flex justify-between p-2 rounded">
            <button className="add-file">
              <label htmlFor="file">
                <Plus />
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={selectedFile}
              />
            </button>
            <input
              type="text"
              name="message"
              value={state.fileName ? state.fileName : state.message}
              placeholder="Type a message here"
              onChange={handleOnChange}
            />
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
