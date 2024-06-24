import { cn } from "@/lib/utils";
import ChatRoomHeader from "./ChatRoomHeader";
import MessagesContainer from "./MessagesContainer";
import { Separator } from "../ui/separator";

export default function ChatRoomContainer({
  className,
}: {
  className: string;
}) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <ChatRoomHeader />
      <Separator />
      <MessagesContainer className="flex-auto" />
    </div>
  );
}
