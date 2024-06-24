import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getAllUsers, getUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllUsers);

router.get("/:userId", protectRoute, getUserDetails);

export default router;
