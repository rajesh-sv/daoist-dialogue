import { useChatRoomContext } from "@/contexts/ChatRoomContext";
import { useSocketContext } from "@/contexts/SocketContext";
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import { MessageType } from "@/types";

const sound = new Audio(notificationSound);

export default function useListenMessages() {
  // @ts-ignore
  const { socket } = useSocketContext();
  // @ts-ignore
  const { messages, setMessages } = useChatRoomContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageType) => {
      sound.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
}
