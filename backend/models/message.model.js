import mongoose, { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sentByUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chatRoomId: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;
