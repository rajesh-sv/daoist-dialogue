import {
  ChatRoomContextType,
  ChatRoomType,
  MessageType,
  UserType,
} from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";

export const ChatRoomContext = createContext<ChatRoomContextType | null>(null);

export const useChatRoomContext = () => useContext(ChatRoomContext);

export const ChatRoomContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoomType | null>(
    null,
  );
  const [users, setUsers] = useState<UserType[]>([]);
  const [messages, setMessages] = useState<MessageType[]>([]);

  return (
    <ChatRoomContext.Provider
      value={{
        selectedChatRoom,
        setSelectedChatRoom,
        users,
        setUsers,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};
