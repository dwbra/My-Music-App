import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9000" });

export const getUserPlaylists = () => API.get("/spotify/get-playlists");
