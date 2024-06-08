import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MessageCirclePlus } from "lucide-react";
import { UserSchema } from "@/types";

type Props = {
  user: UserSchema;
  loading: boolean;
  onCreateChat: (user: UserSchema) => Promise<void>;
};

const UserItem = ({ user, loading, onCreateChat }: Props) => {
  return (
    <div className="flex items-center gap-3 justify-between p-3 mb-3 rounded bg-white">
      <div className="flex items-center justify-center gap-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex justify-center flex-col">
          <div className="flex gap-1 items-center ">
            <div className="font-semibold">{user.username || user.email}</div>
            <div>-</div>
            <div className="text-slate-400 text-xs">{"5 day ago"}</div>
          </div>
          <div className="line-clamp-1 text-slate-400 text-xs">
            {user.status ||
              `Lorem ipsum dolor sit amet consectetur adipisicing elit.`}
          </div>
        </div>
      </div>

      <Button
        variant="default"
        disabled={loading}
        onClick={() => onCreateChat(user)}
      >
        <MessageCirclePlus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserItem;
