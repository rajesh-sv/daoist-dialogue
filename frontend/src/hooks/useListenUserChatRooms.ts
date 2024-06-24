import { useSocketContext } from "@/contexts/SocketContext";
import { useUserChatRoomsContext } from "@/contexts/UserChatRoomsContext";
import { ChatRoomType } from "@/types";
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";

const sound = new Audio(notificationSound);

export default function useListenChatRooms() {
  // @ts-ignore
  const { socket } = useSocketContext();
  // @ts-ignore
  const { userChatRooms, setUserChatRooms } = useUserChatRoomsContext();

  useEffect(() => {
    socket?.on("newChatRoom", (chatRoom: ChatRoomType) => {
      sound.play();
      setUserChatRooms([...userChatRooms, chatRoom]);
    });
    return () => {
      socket?.off("newChatRoom");
    };
  }, [socket, userChatRooms, setUserChatRooms]);
}
