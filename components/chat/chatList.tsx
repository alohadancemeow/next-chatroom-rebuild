"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import UserList from "./userList";

const usersList = [
  {
    name: "user1",
    momentTime: "2024-06-04",
  },
  {
    name: "user2",
    momentTime: "2024-06-04",
  },
  {
    name: "user3",
    momentTime: "2024-06-04",
  },
  {
    name: "user4",
    momentTime: "2024-06-04",
  },
  {
    name: "user5",
    momentTime: "2024-06-04",
  },
];

type Props = {};

const ChatList = (props: Props) => {
  const handleLeave = () => {};

  return (
    <div className="border-r-[#ebe7fb] pt-10 max-h-[90%]">
      <Button className="mt-3 shadow-sm gap-2" variant="default">
        <LogOut />
        <div>Leave ChatRoom</div>
      </Button>

      <div className="pt-3 px-3 mt-1 text-[#516874]">
        <h2>Who's in here?</h2>
      </div>

      <div className="overflow-y-scroll">
        {
          //todo: map joined users
          usersList.map(({ name, momentTime }, index) => (
            <UserList key={index} username={name} momentTime={momentTime} />
          ))
        }
      </div>
    </div>
  );
};

export default ChatList;
