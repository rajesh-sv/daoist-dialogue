import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "../sidebar/Sidebar";
import { Button } from "../ui/button";
import { AlignLeft } from "lucide-react";
import ChatRoom from "../sidebar/ChatRoom";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import ChatRoomDetails from "./ChatRoomDetails";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ChatRoomHeader() {
  // @ts-ignore
  const { selectedChatRoom } = useChatRoomContext();

  return (
    <div className="p-8 flex items-center bg-secondary">
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="link" className="w-12 h-12 p-0">
              <AlignLeft />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full p-0">
            <SheetClose asChild>
              <Sidebar className="" />
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
      <div
        dir="rtl"
        className="ml-auto hover:cursor-pointer hover:scale-[1.02]"
      >
        {selectedChatRoom && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="p-2 h-fit">
                <ChatRoom chatRoom={selectedChatRoom} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-96 rounded-md">
              <ChatRoomDetails chatRoom={selectedChatRoom} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
