import express from "express";
import {
  spotifyAuth,
  getSpotifyPlaylists
} from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/login", spotifyAuth);
router.get("/get-playlists", getSpotifyPlaylists);

export default router;
