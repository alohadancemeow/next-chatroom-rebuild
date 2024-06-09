import { create } from "zustand";
import { useUserStore } from "./user-store";
import { ChatWithUser } from "@/types";

interface ChatStore {
  chat: ChatWithUser | null;
  isCurrentUserBlocked: boolean;
  isReceiverBlocked: boolean;
  changeChat: (chat: ChatWithUser) => void;
  changeBlock: () => void;
  resetChat: (chat: ChatWithUser) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chat: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chat) => {
    const currentUser = useUserStore.getState().currentUser;

    // CHECK IF CURRENT USER IS BLOCKED
    if (chat.blocked?.includes(currentUser?.id!)) {
      return set({
        chat,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // CHECK IF RECEIVER IS BLOCKED
    else if (currentUser?.blocked?.includes(chat.receiverId)) {
      return set({
        chat,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      return set({
        chat,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
  resetChat: (chat) => {
    set({
      chat,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },
}));
