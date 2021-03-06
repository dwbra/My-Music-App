import axios from "axios";

//create a axios base url to use for all calls to the server
const API = axios.create({ baseURL: "http://localhost:9000" });

//create the axios request function to the server to use in our spotify thunk
export const getUserPlaylists = (options: { limit: number; offset: number }) =>
  API.post("/spotify/get-playlists", options);

export const getYoutubePlaylists = () => API.get("/youtube/get-playlists");
