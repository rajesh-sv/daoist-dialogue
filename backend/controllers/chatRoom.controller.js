import ChatRoom from "../models/chatRoom.model.js";
import randomColor from "../utils/randomColor.js";
import { io, getUserSocketId } from "../socket/socket.js";

export const createChatRoom = async (req, res) => {
  try {
    const name = req.body.name.trim();
    const userIds = req.body.userIds;

    if (!name) {
      res.status(400).json({ error: "Empty chat room name" });
    }

    const chatRoom = await ChatRoom.findOne({ name }).select("_id");

    if (chatRoom) {
      return res.status(400).json({ error: "Chat room name already exists" });
    }

    const newChatRoom = new ChatRoom({
      name,
      users: userIds,
      bgColor: randomColor(),
    });

    if (newChatRoom) {
      await newChatRoom.save();

      const savedChatRoom = {
        _id: newChatRoom._id,
        name: newChatRoom.name,
        bgColor: newChatRoom.bgColor,
        createdAt: newChatRoom.createdAt,
      };

      for (const userId of userIds) {
        if (userId !== req.user._id) {
          const userSocketId = getUserSocketId(userId);
          if (userSocketId)
            io.to(userSocketId).emit("newChatRoom", savedChatRoom);
        }
      }

      res.status(201).json(savedChatRoom);
    } else {
      res.status(400).json({ error: "Invalid chatroom data" });
    }
  } catch (error) {
    console.error("Error in createChatRoom controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChatRoomDetails = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const chatRoom = await ChatRoom.findById({ _id: chatRoomId })
      .select("-updatedAt -__v")
      .populate("users", "_id fullName username profilePic createdAt");

    if (!chatRoom) {
      return res.status(404).json({ error: "Chat room not found" });
    }

    res.status(200).json({
      chatRoom: {
        _id: chatRoom._id,
        name: chatRoom.name,
        bgColor: chatRoom.bgColor,
        createdAt: chatRoom.createdAt,
      },
      users: chatRoom.users,
    });
  } catch (error) {
    console.error("Error in getChatRoomDetails controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
