import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";

type Props = {
  message: { name: string; momentTime: string; message: string };
};

const Message = ({ message: { message, name, momentTime } }: Props) => {
  const isSender = name === "user1";
  const isSeen = true;

  return (
    <div className={cn("flex justify-start", isSender && "justify-end")}>
      <div className="px-2 py-1 break-words">
        <p
          className={cn(
            "opacity-70 m-1 text-xs text-[#0e81ce]",
            isSender && "text-end"
          )}
        >
          {`${name} say:`}
        </p>
        <p
          className={cn(
            "px-3 py-1 mb-1 rounded-lg text-white bg-gray-500",
            isSender && "bg-sky-600 "
          )}
        >{`${message}`}</p>
        <div
          className={cn("flex items-center gap-1", isSender && "justify-end")}
        >
          {isSeen && <CheckCheck size={14} />}
          <p className="text-[#777] text-xs font-normal">{momentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
