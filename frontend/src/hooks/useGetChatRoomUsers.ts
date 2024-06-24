import { useToast } from "@/components/ui/use-toast";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import { UserType } from "@/types";
import { useEffect, useState } from "react";

export default function useGetChatRoomUsers(): {
  loading: boolean;
  users: UserType[];
} {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { selectedChatRoom, users, setUsers } = useChatRoomContext();

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/chatrooms/${selectedChatRoom._id}`);

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setUsers(data.users);
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

    if (selectedChatRoom) getUsers();
  }, [selectedChatRoom?._id, setUsers]);

  return { loading, users };
}
