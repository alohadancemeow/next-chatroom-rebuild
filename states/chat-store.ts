import { create } from "zustand";
import { useUserStore } from "./user-store";
import { ChatWithUser } from "@/types";

interface ChatStore {
  // chat: ChatWithUser | null;
  chatId: string;
  receiverId: string;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  changeChat: (chat: ChatWithUser) => void;
  changeBlock: () => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  // chat: null,
  chatId: "",
  receiverId: "",
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chat) => {
    const currentUser = useUserStore.getState().currentUser;

    // CHECK IF CURRENT USER IS BLOCKED
    if (chat.blocked?.includes(currentUser?.id!)) {
      return set({
        chatId: chat.chatId,
        receiverId: chat.receiverId,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER IS BLOCKED
    else if (currentUser?.blocked?.includes(chat.receiverId)) {
      return set({
        chatId: chat.chatId,
        receiverId: chat.receiverId,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chatId: chat.chatId,
        receiverId: chat.receiverId,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
  resetChat: () => {
    set({
      chatId: "",
      // isCurrentUserBlocked: false,
      // isReceiverBlocked: false,
    });
  },
}));
