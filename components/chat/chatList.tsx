"use client";

import { LogOut, Search } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
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
  {
    name: "user6",
    momentTime: "2024-06-04",
  },
  {
    name: "user7",
    momentTime: "2024-06-04",
  },
  {
    name: "user8",
    momentTime: "2024-06-04",
  },
  {
    name: "user9",
    momentTime: "2024-06-04",
  },
  {
    name: "user10",
    momentTime: "2024-06-04",
  },
];

type Props = {};

const ChatList = (props: Props) => {
  const handleLeave = () => {};

  return (
    <div className="max-h-[90%] mr-2 mb-6 flex flex-col justify-between">
      <Button className="shadow-sm gap-2 w-full" variant="default">
        <Search />
        <div>Find more friends</div>
      </Button>

      <ScrollArea className="h-[500px]">
        {
          //todo: map joined users
          usersList.map(({ name, momentTime }, index) => (
            <UserList key={index} username={name} momentTime={momentTime} />
          ))
        }
      </ScrollArea>

      <Button
        className="shadow-sm gap-2 w-full hover:bg-red-700"
        variant="outline"
      >
        <LogOut />
        <div>Leave ChatRoom</div>
      </Button>
    </div>
  );
};

export default ChatList;
