import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MessageCirclePlus } from "lucide-react";

type Props = {
  user: any;
};

const UserItem = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3 justify-between p-3 mb-3 rounded bg-white">
      <div className="flex items-center justify-center gap-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex justify-center flex-col">
          <div className="flex gap-1 items-center ">
            <div className="font-semibold">{user.name}</div>
            <div>-</div>
            <div className="text-slate-400 text-xs">{user.momentTime}</div>
          </div>
          <div className="line-clamp-1 text-slate-400 text-xs">{user.bio}</div>
        </div>
      </div>

      <Button variant="default">
        <MessageCirclePlus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserItem;
