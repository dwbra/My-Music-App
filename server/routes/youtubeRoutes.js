import express from "express";
import { getYoutubePlaylists } from "../controllers/youtubeController.js";

//initialise express router to gain access to all routing methods
const router = express.Router();

//create a get request pathway for the frontend to pull users playlists
router.get("/get-playlists", getYoutubePlaylists);

export default router;
