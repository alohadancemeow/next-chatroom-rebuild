"use client";

import { cn } from "@/lib/utils";
import { MessageSchema } from "@/types";
import { CheckCheck } from "lucide-react";
import { format } from "date-fns";
import useGetUsers from "@/hooks/use-get-users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  message: MessageSchema;
  isSender: boolean;
};

const Message = ({ message, isSender }: Props) => {
  const { getUserById } = useGetUsers();
  const user = getUserById(message.senderId);

  return (
    <div
      className={cn(
        "flex w-full gap-2 mb-4",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      {!isSender && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage
            className="object-cover"
            src={user?.avatar || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col max-w-[70%]", isSender && "items-end")}>
        <div className="flex items-center gap-2 mb-1">
          {!isSender && (
            <span className="text-xs font-bold text-slate-700">
              {user?.username}
            </span>
          )}
          <span className="text-[10px] text-slate-400">
            {format(message.createdAt, "hh:mm a")}
          </span>
          {isSender && <span className="text-xs font-bold text-slate-700">Me</span>}
        </div>

        <div
          className={cn(
            "px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed",
            isSender
              ? "bg-blue-500 text-white rounded-tr-sm"
              : "bg-white border border-slate-100 text-slate-600 rounded-tl-sm"
          )}
        >
          {message.text}
        </div>
      </div>

      {isSender && (
        <div className="flex flex-col justify-end">
          {message.isSeen && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <CheckCheck size={10} className="text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
