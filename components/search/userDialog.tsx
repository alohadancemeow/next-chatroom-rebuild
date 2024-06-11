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

import { getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { ensureUserChatDoc } from "../../helpers/ensure-user-chat-doc";
import { createNewChat } from "../../helpers/create-new-chat";

type Props = {
  users: UserSchema[];
};

const UserDialog = ({ users }: Props) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserStore();
  const searchModal = useSearchModal();

  const filteredUsers =
    users.filter(
      (user) => user.username?.includes(username) && user.id !== currentUser?.id
    ) ?? users;

  /**
   * The `handleAdd` function creates a new chat between two users and updates their chat lists
   * accordingly.
   * @param {UserSchema} user - The `user` parameter in the `handleAdd` function is of type
   * `UserSchema`. It seems like you are creating a new chat between two users and updating their chat
   * records in the database. The function first sets up references to the `chats` and `userchats`
   * collections in
   */
  const handleAdd = async (user: UserSchema) => {
    setLoading(true);

    // Ensure both user chat documents exist
    const userChatDocRef = await ensureUserChatDoc(user.id);
    const currentUserChatDocRef = await ensureUserChatDoc(currentUser?.id!);

    // Fetch existing chats for current user
    const currentUserChatsSnap = await getDoc(currentUserChatDocRef);
    const currentUserChats = currentUserChatsSnap.data()?.chats || [];

    // Check if a chat with this receiverId already exists
    const existingChat = currentUserChats.find(
      (chat: any) => chat.receiverId === user.id
    );

    if (existingChat) {
      toast.error("Chat with this user already exists!");
      setLoading(false);
      return;
    }

    try {
      await createNewChat({
        currentUserChatDocRef,
        userChatDocRef,
        sender: currentUser!,
        reciever: user,
      });

      searchModal.onClose();
      toast.success("Chat created! 🎉");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, Please try again!");
    } finally {
      setLoading(false);
    }
  };

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
              <UserItem
                key={index}
                user={user}
                loading={loading}
                onCreateChat={handleAdd}
              />
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
