import { UserType } from "@/types";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSocketContext } from "@/contexts/SocketContext";

export default function User({ user }: { user: UserType }) {
  // @ts-ignore
  const { authUser } = useAuthContext();
  // @ts-ignore
  const { onlineUsers } = useSocketContext();
  const isMe = authUser._id === user._id ? " (You)" : "";
  const isOnline = onlineUsers.has(user._id);

  return (
    <div className="flex items-center gap-4">
      <div className="w-fit relative">
        {isOnline && (
          <span className="top-0 right-0 absolute z-50 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        )}
        <Avatar className="w-12 h-12">
          <AvatarImage src={user.profilePic} alt={user.username} />
          <AvatarFallback className="bg-slate-700">
            {(user.username.length > 1
              ? user.username.slice(0, 2)
              : user.username[0]
            ).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="leading-7">{user.username + isMe}</p>
        <p className="text-muted-foreground text-xs">{user.fullName}</p>
      </div>
    </div>
  );
}
