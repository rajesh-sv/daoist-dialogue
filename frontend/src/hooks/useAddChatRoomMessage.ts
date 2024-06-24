import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import { AddChatRoomMessageType } from "@/types";
import { useState } from "react";

export default function useAddChatRoomMessage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { authUser } = useAuthContext();
  // @ts-ignore
  const { selectedChatRoom, messages, setMessages } = useChatRoomContext();

  const addMessage = async ({ message }: AddChatRoomMessageType) => {
    if (!message) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/messages/${selectedChatRoom._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      data.sentByUser = authUser;
      setMessages([...messages, data]);
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

  return { loading, addMessage };
}
