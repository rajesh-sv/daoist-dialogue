import User from "../models/user.model.js";
import ChatRoom from "../models/chatRoom.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -updatedAt -__v");

    res.status(200).json(users ?? []);
  } catch (error) {
    console.error("Error in getAllUsers controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserDetails = async (req, res) => {
  const userId = req.params.userId;
  try {
    const [user, chatRooms] = await Promise.all([
      User.findOne({ _id: userId }).select("-password -updatedAt -__v"),
      ChatRoom.find({ users: userId }).select("_id name bgColor createdAt"),
    ]);

    if (!user) {
      res.status(404).json({ error: "User not found!" });
    }

    res.status(200).json({
      user,
      chatRooms,
    });
  } catch (error) {
    console.error("Error in getUserDetails controller: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
