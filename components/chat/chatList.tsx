"use client";

import { LogOut, Search } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import UserList from "./userList";

const usersList = [
  {
    name: "user1",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user2",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user3",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user4",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user7",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user6",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user10",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user8",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
  {
    name: "user9",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
  },
];

type Props = {};

const ChatList = (props: Props) => {
  const handleLeave = () => {};

  return (
    <div className="w-[25%] mb-5 mr-2 flex flex-col gap-6 justify-between">
      <Button className="shadow-sm gap-2 w-full" variant="default">
        <Search />
        <div>Find more friends</div>
      </Button>

      <ScrollArea className="xl:h-[500px] h-[470px]">
        {
          //todo: map joined users
          usersList.map((user, index) => (
            <UserList key={index} user={user} />
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
