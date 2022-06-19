import express from "express";
import { getSpotifyPlaylists } from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/get-playlists", getSpotifyPlaylists);

export default router;
