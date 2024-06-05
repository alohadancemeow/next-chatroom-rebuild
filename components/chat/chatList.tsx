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
    name: "user1",
    momentTime: "2024-06-04",
  },
  {
    name: "user4",
    momentTime: "2024-06-04",
  },
  {
    name: "user1",
    momentTime: "2024-06-04",
  },
  {
    name: "user6",
    momentTime: "2024-06-04",
  },
  {
    name: "user1",
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
    name: "user1",
    momentTime: "2024-06-04",
  },
];

type Props = {};

const ChatList = (props: Props) => {
  const handleLeave = () => {};

  return (
    <div className="w-[20%] mb-5 mr-2 flex flex-col gap-6 justify-between">
      <Button className="shadow-sm gap-2 w-full" variant="default">
        <Search />
        <div>Find more friends</div>
      </Button>

      <ScrollArea className="xl:h-[500px] h-[470px]">
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
