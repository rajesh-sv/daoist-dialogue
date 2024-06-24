import { useAuthContext } from "@/contexts/AuthContext";
import { MessageType } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import User from "../sidebar/User";
import { cn } from "@/lib/utils";
import getLocalTime from "@/lib/getLocalTime";

export default function Message({ message }: { message: MessageType }) {
  // @ts-ignore
  const { authUser } = useAuthContext();
  const user = message.sentByUser;
  const fromMe = user._id === authUser._id;

  return (
    <div className="flex items-end gap-2 mt-4" dir={fromMe ? "rtl" : "ltr"}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-auto h-auto">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.profilePic} alt={user.username} />
              <AvatarFallback className="bg-slate-700 text-xs">
                {(user.username.length > 1
                  ? user.username.slice(0, 2)
                  : user.username[0]
                ).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <User user={user} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div dir="ltr" className="max-w-[75%]">
        <p
          className={cn(
            "leading-5 text-sm w-fit rounded-sm p-2",
            fromMe ? "bg-primary text-right ml-auto" : "bg-muted",
          )}
        >
          {message.message}
        </p>
        <p
          className={cn(
            "text-[10px] text-muted-foreground mt-1",
            fromMe ? "text-right" : "",
          )}
        >
          {getLocalTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
