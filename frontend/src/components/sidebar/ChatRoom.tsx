import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatRoomType } from "@/types";

export default function ChatRoom({ chatRoom }: { chatRoom: ChatRoomType }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-12 h-12">
        <AvatarFallback style={{ backgroundColor: chatRoom.bgColor }}>
          {(chatRoom.name.length > 1
            ? chatRoom.name.slice(0, 2)
            : chatRoom.name[0]
          ).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <p className="leading-7">{chatRoom.name}</p>
    </div>
  );
}
