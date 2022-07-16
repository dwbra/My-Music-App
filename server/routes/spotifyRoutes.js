import express from "express";
import { getSpotifyPlaylists } from "../controllers/spotifyController.js";

//initialise express router to gain access to all routing methods
const router = express.Router();

//create a get request pathway for the frontend to pull users playlists
router.post("/get-playlists", getSpotifyPlaylists);

export default router;
