import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MessageSquarePlus } from "lucide-react";
import { UserSchema } from "@/types";

type Props = {
  user: UserSchema;
  loading: boolean;
  onCreateChat: (user: UserSchema) => Promise<void>;
};

const UserItem = ({ user, loading, onCreateChat }: Props) => {
  return (
    <div className="flex items-center gap-3 justify-between p-2 rounded-2xl hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage
              className="object-cover"
              src={user.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Online status indicator */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-bold text-slate-900 truncate">
              {user.username || user.email?.split("@")[0]}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
              • 5 days ago
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate font-medium">
            {user.status || "Lorem ipsum dolor sit amet consectetur..."}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size='icon'
        disabled={loading}
        onClick={() => onCreateChat(user)}
        className="rounded-full bg-slate-900 text-white hover:bg-slate-800 hover:text-white flex-shrink-0 shadow-lg shadow-slate-200"
      >
        <MessageSquarePlus className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default UserItem;
