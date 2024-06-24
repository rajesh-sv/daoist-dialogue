import ChatRoomContainer from "@/components/chatroom/ChatRoomContainer";
import Sidebar from "@/components/sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="h-dvh flex">
      <Sidebar className="max-sm:hidden flex-shrink-0 w-80 lg:w-96" />
      <Separator orientation="vertical" />
      <ChatRoomContainer className="flex-auto" />
    </div>
  );
}
