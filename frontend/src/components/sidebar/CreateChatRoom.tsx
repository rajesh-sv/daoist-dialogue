import { MessageSquarePlus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import User from "./User";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import { useState } from "react";
import useCreateChatRoom from "@/hooks/useCreateChatRoom";
import { RoundSpinner } from "../ui/spinner";
import useGetUsers from "@/hooks/useGetUsers";
import UsersContainerSkeleton from "../skeletons/UsersContainerSkeleton";

export default function CreateChatRoom() {
  const { loading, users } = useGetUsers();
  const [name, setName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState(new Set<string>());
  const createChatRoomStates = useCreateChatRoom();
  const createChatRoomLoading = createChatRoomStates.loading;
  const createChatRoom = createChatRoomStates.createChatRoom;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-12 h-12 p-0">
          <MessageSquarePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>Create chat room</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Chat room name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DialogDescription>
          Select users to add to the chat room
        </DialogDescription>
        <ScrollArea className="h-[50dvh]">
          {loading ? (
            <UsersContainerSkeleton />
          ) : (
            <ul>
              {users.map((user) => {
                return (
                  <li
                    key={user._id}
                    className="p-4 flex items-center gap-4 hover:bg-muted"
                  >
                    <Checkbox
                      id={user._id}
                      value={user._id}
                      className="rounded-[4px]"
                      checked={selectedUserIds.has(user._id)}
                      onClick={() => {
                        const newSelectedUserIds = new Set<string>(
                          selectedUserIds
                        );
                        if (selectedUserIds.has(user._id))
                          newSelectedUserIds.delete(user._id);
                        else newSelectedUserIds.add(user._id);
                        setSelectedUserIds(newSelectedUserIds);
                      }}
                    />
                    <label
                      htmlFor={user._id}
                      className="text-sm font-medium leading-none hover:bg-muted cursor-pointer"
                    >
                      <User user={user} />
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={createChatRoomLoading}
              onClick={() => {
                createChatRoom({ name, userIds: selectedUserIds });
                setName("");
                setSelectedUserIds(new Set<string>());
              }}
            >
              {createChatRoomLoading ? <RoundSpinner /> : "Create"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
