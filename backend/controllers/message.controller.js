import ChatRoom from "../models/chatRoom.model.js";
import Message from "../models/message.model.js";
import { io, getUserSocketId } from "../socket/socket.js";

export const getChatRoomMessages = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const messages = await Message.find({ chatRoomId })
      .select("_id message sentByUser createdAt")
      .populate("sentByUser", "_id fullName username profilePic createdAt")
      .sort("createdAt");
    res.status(200).json(messages ?? []);
  } catch (error) {
    console.error("Error in getMessagesInChatRoom controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addChatRoomMessage = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const message = req.body.message.trim();
    const sentByUser = req.user._id;

    if (!message) {
      res.status(400).json({ error: "Empty message" });
    }

    const chatRoom = await ChatRoom.findOne({ _id: chatRoomId }).select(
      "users"
    );

    if (!chatRoom) {
      res.status(404).json({ error: "Chat room not found" });
    }

    const newMessage = new Message({
      sentByUser,
      chatRoomId,
      message,
    });

    if (newMessage) {
      await newMessage.save();

      const savedMessage = {
        _id: newMessage._id,
        sentByUser: req.user,
        message: newMessage.message,
        createdAt: newMessage.createdAt,
      };

      for (const userId of chatRoom.users) {
        const userSocketId = getUserSocketId(userId.toString());
        if (userSocketId) io.to(userSocketId).emit("newMessage", savedMessage);
      }

      res.status(201).json(savedMessage);
    } else {
      res.status(400).json({ error: "Invalid message data" });
    }
  } catch (error) {
    console.error("Error in addMessageInChatRoom controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
