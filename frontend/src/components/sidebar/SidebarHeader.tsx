import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatRoom from "./ChatRoom";
import { ScrollArea } from "../ui/scroll-area";
import { ModeToggle } from "../mode-toggle";
import { useState } from "react";
import useGetUserChatRooms from "@/hooks/useGetUserChatRooms";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import ChatRoomsContainerSkeleton from "../skeletons/ChatRoomsContainerSkeleton";

export default function SidebarHeader() {
  const { loading, userChatRooms } = useGetUserChatRooms();
  const [open, setOpen] = useState(false);
  // @ts-ignore
  const { setSelectedChatRoom } = useChatRoomContext();

  return (
    <div className="p-8 flex items-center gap-4">
      <ModeToggle />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            Search
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 overflow-auto">
          {loading ? (
            <ChatRoomsContainerSkeleton />
          ) : (
            <Command>
              <CommandInput placeholder="Search chat room..." />
              <CommandList className="max-h-[50vh]">
                <ScrollArea className="h-[50vh]">
                  <CommandEmpty>No chat room found</CommandEmpty>
                  <CommandGroup>
                    {userChatRooms.map((chatRoom) => (
                      <CommandItem
                        key={chatRoom._id}
                        value={chatRoom.name}
                        onSelect={() => {
                          setOpen(false);
                          setSelectedChatRoom(chatRoom);
                        }}
                        className="p-4 cursor-pointer"
                      >
                        <ChatRoom chatRoom={chatRoom} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
