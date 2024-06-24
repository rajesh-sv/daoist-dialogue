import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  createChatRoom,
  getChatRoomDetails,
} from "../controllers/chatRoom.controller.js";

const router = express.Router();

router.post("/", protectRoute, createChatRoom);

router.get("/:chatRoomId", protectRoute, getChatRoomDetails);

export default router;
