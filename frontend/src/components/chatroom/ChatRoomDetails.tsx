import { ChatRoomType } from "@/types";
import ChatRoom from "../sidebar/ChatRoom";
import { ScrollArea } from "../ui/scroll-area";
import UsersContainerSkeleton from "../skeletons/UsersContainerSkeleton";
import User from "../sidebar/User";
import getLocalTime from "@/lib/getLocalTime";
import { Separator } from "../ui/separator";
import useGetChatRoomUsers from "@/hooks/useGetChatRoomUsers";

export default function ChatRoomDetails({
  chatRoom,
}: {
  chatRoom: ChatRoomType;
}) {
  const { loading, users } = useGetChatRoomUsers();

  return (
    <div dir="ltr">
      <ChatRoom chatRoom={chatRoom} />
      <p className="text-[10px] text-muted-foreground my-1 ml-2">
        {"Created: " + getLocalTime(chatRoom.createdAt)}
      </p>
      <Separator />
      <p className="mt-2 font-bold">Members</p>
      <ScrollArea className="h-[50dvh]">
        {loading ? (
          <UsersContainerSkeleton />
        ) : (
          <ul>
            {users.map((user) => {
              return (
                <li key={user._id} className="p-4 hover:bg-muted">
                  <User user={user} />
                </li>
              );
            })}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
}
