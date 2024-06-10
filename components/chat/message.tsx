"use client";

import { cn } from "@/lib/utils";
import { MessageSchema } from "@/types";
import { CheckCheck } from "lucide-react";

type Props = {
  message: MessageSchema;
  isSender: boolean;
};

const Message = ({ message, isSender }: Props) => {
  return (
    <div className={cn("flex justify-start", isSender && "justify-end")}>
      <div className="px-2 py-1 break-words">
        <p
          className={cn(
            "opacity-70 m-1 text-xs text-[#0e81ce]",
            isSender && "text-end"
          )}
        >
          {`${message.senderId} say:`}
        </p>
        <div className={cn("flex justify-start", isSender && "justify-end")}>
          <p
            className={cn(
              "px-3 py-1 w-fit mb-1 rounded-lg text-white bg-gray-500",
              isSender && "bg-sky-600"
            )}
          >
            {`${message.text}`}
          </p>
        </div>
        <div
          className={cn("flex items-center gap-1", isSender && "justify-end")}
        >
          {message.isSeen && <CheckCheck size={14} />}
          <p className="text-[#777] text-xs font-normal">
            {`${message.createdAt}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
