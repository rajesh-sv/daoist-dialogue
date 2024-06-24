import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getChatRoomMessages,
  addChatRoomMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:chatRoomId", protectRoute, getChatRoomMessages);

router.post("/:chatRoomId", protectRoute, addChatRoomMessage);

export default router;
