import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChatWithUser } from "@/types";
import { useChatStore } from "@/states/chat-store";
import { formatDistanceToNow } from "date-fns";

type Props = {
  chat: ChatWithUser;
  handleSelected: (chat: ChatWithUser) => Promise<void>;
};

const ChatItem = ({ chat, handleSelected }: Props) => {
  const { chatId } = useChatStore();
  const isActive = chatId === chat.chatId;

  return (
    <div
      onClick={() => handleSelected(chat)}
      className={cn(
        "flex items-center cursor-pointer gap-3 justify-start p-3 rounded-2xl transition-all duration-200 group relative",
        isActive ? "bg-blue-50" : "hover:bg-slate-50 bg-white"
      )}
    >
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage
            className="object-cover"
            src={chat.avatar || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* Online Indicator (Mock logic) */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      <div className="flex justify-center w-full flex-col items-start overflow-hidden">
        <div className="flex justify-between w-full items-center mb-0.5">
          <div className="font-bold text-sm text-slate-700">{chat.username}</div>
          {isActive ? (
            <span className="text-[10px] font-bold text-blue-500">Active</span>
          ) : (
            <span className="text-[10px] text-slate-400">
              {chat.updatedAt
                ? formatDistanceToNow(chat.updatedAt, { addSuffix: true })
                    .replace("about ", "")
                    .replace(" ago", "")
                : "New"}
            </span>
          )}
        </div>
        <div
          className={cn(
            "line-clamp-1 text-xs w-full truncate",
            isActive ? "text-blue-400 font-medium" : "text-slate-400 group-hover:text-slate-500",
            !chat.isSeen && !isActive && "font-bold text-slate-800"
          )}
        >
          {chat.lastMessage || "Start a conversation"}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
