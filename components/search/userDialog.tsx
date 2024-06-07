"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";

import useSearchModal from "@/states/search-modal";
import UserItem from "./userItem";
import { UserSchema } from "@/types";
import { useUserStore } from "@/states/user-store";

type Props = {
  users: UserSchema[];
};

const UserDialog = ({ users }: Props) => {
  const [username, setUsername] = useState("");

  const { currentUser } = useUserStore();
  const searchModal = useSearchModal();

  const filteredUsers =
    users.filter(
      (user) => user.username?.includes(username) && user.id !== currentUser?.id
    ) ?? users;

  return (
    <Dialog open={searchModal.isOpen} onOpenChange={searchModal.onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>More lovely friends </DialogTitle>
          <DialogDescription>
            Go make yourself some friends, or you'll be lonely.
          </DialogDescription>
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </DialogHeader>
        <div className="flex flex-col">
          <ScrollArea className="xl:h-[600px] h-[480px]">
            {filteredUsers.map((user, index) => (
              <UserItem user={user} key={index} />
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
