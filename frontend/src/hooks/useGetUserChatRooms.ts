import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useUserChatRoomsContext } from "@/contexts/UserChatRoomsContext";
import { ChatRoomType } from "@/types";
import { useEffect, useState } from "react";

export default function useGetUserChatRooms(): {
  loading: boolean;
  userChatRooms: ChatRoomType[];
} {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const { userChatRooms, setUserChatRooms } = useUserChatRoomsContext();
  const { toast } = useToast();
  // @ts-ignore
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getUserChatRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${authUser._id}`);

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setUserChatRooms(data.chatRooms);
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

    if (authUser._id) getUserChatRooms();
  }, [authUser._id, setUserChatRooms]);

  return { loading, userChatRooms };
}
