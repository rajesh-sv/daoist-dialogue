import mongoose, { Schema } from "mongoose";

const ChatRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    bgColor: { type: String, required: true },
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

export default ChatRoom;
