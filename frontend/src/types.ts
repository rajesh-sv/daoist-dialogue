import { Socket } from "socket.io-client";

// DB Model Types
export type ChatRoomType = {
  _id: string;
  name: string;
  bgColor: string;
  createdAt: string;
};

export type UserType = {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  createdAt: string;
};

export type MessageType = {
  _id: string;
  message: string;
  sentByUser: UserType;
  createdAt: string;
};

// Form Types
export type LoginInputsType = {
  username: string;
  password: string;
};

export type SignupInputsType = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type CreateChatRoomType = {
  name: string;
  userIds: Set<string>;
};

export type AddChatRoomMessageType = {
  message: string;
};

// React Context Types
export type AuthContextType = {
  authUser: UserType | null;
  setAuthUser: (user: UserType | null) => void;
};

export type UserChatRoomsContextType = {
  userChatRooms: ChatRoomType[];
  setUserChatRooms: (chatRooms: ChatRoomType[]) => void;
};

export type ChatRoomContextType = {
  selectedChatRoom: ChatRoomType | null;
  setSelectedChatRoom: (chatRoom: ChatRoomType | null) => void;
  users: UserType[];
  setUsers: (users: UserType[]) => void;
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
};

export type SocketContextType = {
  socket: Socket | null;
  onlineUsers: Set<string>;
};
