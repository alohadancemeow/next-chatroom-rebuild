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
import { UserSchema, ChatSchema } from "@/types";
import { useUserStore } from "@/states/user-store";

import { getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { ensureUserChatDoc } from "../../helpers/ensure-user-chat-doc";
import { createNewChat } from "../../helpers/create-new-chat";
import { Moon, Search } from "lucide-react";
import { combineChatWithUser } from "@/helpers/combine-chat-with-user";
import { useChatStore } from "@/states/chat-store";

type Props = {
  users: UserSchema[];
};

const UserDialog = ({ users }: Props) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserStore();
  const searchModal = useSearchModal();
  const { changeChat } = useChatStore();

  const filteredUsers =
    users.filter(
      (user) => user.username?.includes(username) && user.id !== currentUser?.id
    ) ?? users;

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
      (chat: ChatSchema) => chat.receiverId === user.id
    );

    const chatWithUser = await combineChatWithUser(existingChat);

    if (existingChat) {
      // toast.error("Chat with this user already exists!");
      if (!chatWithUser) return;
      changeChat(chatWithUser);
      setLoading(false);
      searchModal.onClose();
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
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white rounded-3xl border-none shadow-2xl p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            More lovely friends
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Once, I was seven years old, my mama told me {" "}
            <span className="text-slate-600 font-semibold">
              {`"Go make yourself some friends, or you’ll be lonely."`}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="bg-slate-50 border-none rounded-2xl pl-11 h-12 text-slate-600 placeholder:text-slate-400"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-grow min-h-[300px]">
          <ScrollArea className="h-[350px] -mx-2 px-2">
            <div className="flex flex-col gap-3 pb-2">
              {filteredUsers.map((user, index) => (
                <UserItem
                  key={index}
                  user={user}
                  loading={loading}
                  onCreateChat={handleAdd}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-50">
          <p className="text-xs font-medium text-slate-400">
            Total {filteredUsers.length} potential friends found
          </p>
          {/* <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
            <Moon className="w-4 h-4 text-slate-500" />
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
