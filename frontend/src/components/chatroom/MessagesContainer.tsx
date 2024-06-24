import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import useGetChatRoomMessages from "@/hooks/useGetChatRoomMessages";
import MessagesContainerSkeleton from "../skeletons/MessagesContainerSkeleton";
import Message from "./Message";
import { Separator } from "../ui/separator";
import MessageInput from "./MessageInput";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { MessageSquare } from "lucide-react";
import useListenMessages from "@/hooks/useListenMessages";
import { useEffect, useRef } from "react";

export default function MessagesContainer({
  className,
}: {
  className: string;
}) {
  const { loading, messages } = useGetChatRoomMessages();
  // @ts-ignore
  const { selectedChatRoom } = useChatRoomContext();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return selectedChatRoom ? (
    <>
      <ScrollArea className={cn("h-full p-4", className)}>
        {loading ? (
          <MessagesContainerSkeleton />
        ) : (
          messages.map((message) => (
            // @ts-ignore
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))
        )}
      </ScrollArea>
      <Separator />
      <MessageInput className="mt-auto" />
    </>
  ) : (
    <NoChatSelected />
  );
}

function NoChatSelected() {
  // @ts-ignore
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome {authUser.fullName} 👋</p>
        <p>Select a chat to start discussing the Dao!</p>
        <MessageSquare className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}
