import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChatWithUser } from "@/types";

type Props = {
  chat: ChatWithUser;
};

const ChatItem = ({ chat }: Props) => {
  return (
    <div className="flex items-center cursor-pointer gap-3 justify-start p-3 shadow mb-3 rounded bg-white">
      <Avatar
        className={cn("w-14 h-14", !chat.isSeen && "border-4 border-sky-600")}
      >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center w-full flex-col items-start">
        <div className="flex gap-1 items-center ">
          <div className="font-semibold">{chat.username}</div>
          {/* <div>-</div>
          <div className="text-slate-400 text-xs">{chat.updatedAt}</div> */}
        </div>
        <div
          className={cn(
            "line-clamp-2 text-slate-400 text-xs",
            !chat.isSeen && "font-semibold text-slate-700"
          )}
        >
          {chat.lastMessage}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
