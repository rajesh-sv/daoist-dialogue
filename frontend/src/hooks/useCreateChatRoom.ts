import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import { useUserChatRoomsContext } from "@/contexts/UserChatRoomsContext";
import { CreateChatRoomType } from "@/types";
import { useState } from "react";

export default function useCreateChatRoom() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { authUser } = useAuthContext();
  // @ts-ignore
  const { userChatRooms, setUserChatRooms } = useUserChatRoomsContext();
  // @ts-ignore
  const { setSelectedChatRoom } = useChatRoomContext();

  const handleValidation = ({ name, userIds }: CreateChatRoomType) => {
    if (!name) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Please enter chat room name",
      });
      return false;
    }

    if (!userIds.size) {
      toast({
        variant: "destructive",
        title: "Invalid",
        description: "Select atleast one user",
      });
      return false;
    }

    return true;
  };

  const createChatRoom = async ({ name, userIds }: CreateChatRoomType) => {
    const validationSuccess = handleValidation({ name, userIds });

    if (!validationSuccess) return;

    try {
      setLoading(true);

      userIds.add(authUser._id);

      const res = await fetch("/api/chatrooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, userIds: [...userIds] }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setUserChatRooms([...userChatRooms, data]);
      setSelectedChatRoom(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        // @ts-ignore
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, createChatRoom };
}
