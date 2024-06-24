import { ChatRoomType, UserChatRoomsContextType } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";

export const UserChatRoomsContext =
  createContext<UserChatRoomsContextType | null>(null);

export const useUserChatRoomsContext = () => useContext(UserChatRoomsContext);

export const UserChatRoomsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userChatRooms, setUserChatRooms] = useState<ChatRoomType[]>([]);

  return (
    <UserChatRoomsContext.Provider value={{ userChatRooms, setUserChatRooms }}>
      {children}
    </UserChatRoomsContext.Provider>
  );
};
