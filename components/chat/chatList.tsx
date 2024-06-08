"use client";

import { LogOut, Search } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import ChatItem from "./chatItem";
import useSearchModal from "@/states/search-modal";
import UserDialog from "../search/userDialog";

import { auth } from "@/lib/firebase";
import useGetUsers from "@/hooks/use-get-users";

const usersList = [
  {
    name: "user1",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user2",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user3",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user4",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user7",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user6",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user10",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user8",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀",
  },
  {
    name: "user9",
    message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    momentTime: "5 day ago",
    bio: "this is a test status 🍀 asdwasdwasd asdw asd sdw ads w",
  },
];

type Props = {};

const ChatList = (props: Props) => {
  const searchModal = useSearchModal();
  const { users } = useGetUsers();

  return (
    <div className="w-[25%] cursor-pointer mb-5 mr-2 flex flex-col gap-6 justify-between">
      <Button
        onClick={() => searchModal.onOpen()}
        className="shadow-sm gap-2 w-full"
        variant="default"
      >
        <Search />
        <div>Find more friends</div>
      </Button>

      <ScrollArea className="xl:h-[510px] h-[490px]">
        {
          //todo: map joined users
          usersList.map((user, index) => (
            <ChatItem key={index} user={user} />
          ))
        }
      </ScrollArea>

      <Button
        className="shadow-sm gap-2 w-full hover:bg-red-700"
        variant="outline"
        onClick={() => {
          auth.signOut();
          // resetChat();
        }}
      >
        <LogOut />
        <div>Leave ChatRoom</div>
      </Button>

      <UserDialog users={users} />
    </div>
  );
};

export default ChatList;
