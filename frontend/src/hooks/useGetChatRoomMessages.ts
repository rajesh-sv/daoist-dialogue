import { useToast } from "@/components/ui/use-toast";
import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import { MessageType } from "@/types";
import { useEffect, useState } from "react";

export default function useGetChatRoomMessages(): {
  loading: boolean;
  messages: MessageType[];
} {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { selectedChatRoom, messages, setMessages } = useChatRoomContext();

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/messages/${selectedChatRoom._id}`);

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
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

    if (selectedChatRoom) getMessages();
  }, [selectedChatRoom?._id, setMessages]);

  return { loading, messages };
}
