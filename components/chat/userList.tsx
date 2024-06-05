import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  user: any;
};

const UserList = ({ user }: Props) => {
  const isSeen = user.name !== "user1";

  return (
    <div
      className={
        "flex items-center gap-3 justify-start p-3 shadow mb-3 rounded bg-white"
      }
    >
      <Avatar className={cn("w-14 h-14", isSeen && "border-4 border-sky-600")}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center w-full flex-col items-start">
        <div className="flex gap-1 items-center ">
          <div className="font-semibold">{user.name}</div>
          <div>-</div>
          <div className="text-slate-400 text-xs">{user.momentTime}</div>
        </div>
        <div
          className={cn(
            "line-clamp-2 text-slate-400 text-xs",
            isSeen && "font-semibold text-slate-700"
          )}
        >
          {user.message}
        </div>
      </div>
    </div>
  );
};

export default UserList;
