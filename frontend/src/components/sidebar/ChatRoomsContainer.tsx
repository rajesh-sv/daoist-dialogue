import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import ChatRoom from "./ChatRoom";
import useGetUserChatRooms from "@/hooks/useGetUserChatRooms";
import ChatRoomsContainerSkeleton from "../skeletons/ChatRoomsContainerSkeleton";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import useListenChatRooms from "@/hooks/useListenUserChatRooms";

export default function ChatRoomsContainer({
  className,
}: {
  className: string;
}) {
  const { loading, userChatRooms } = useGetUserChatRooms();
  // @ts-ignore
  const { selectedChatRoom, setSelectedChatRoom } = useChatRoomContext();
  useListenChatRooms();

  return (
    <ScrollArea className={cn("", className)}>
      {loading ? (
        <ChatRoomsContainerSkeleton />
      ) : (
        <ul>
          {userChatRooms.map((chatRoom) => (
            <li
              key={chatRoom._id}
              className={cn(
                "py-4 px-8 hover:bg-muted cursor-pointer",
                selectedChatRoom && selectedChatRoom._id === chatRoom._id
                  ? "bg-muted"
                  : ""
              )}
              onClick={() => setSelectedChatRoom(chatRoom)}
            >
              <ChatRoom chatRoom={chatRoom} />
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  );
}
