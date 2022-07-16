import dotenv from "dotenv";
import { google } from "googleapis";

//get access to all of our env variables (API KEYS)
dotenv.config();

export const getYoutubePlaylists = async (req, res) => {
  //https://developers.google.com/youtube/v3/docs/playlists
  //when using googles apis, you need to think sequential about the steps in the api call process.
  //EG, youtube is the parent api
  //playlists is one of the children resource
  //list is one of the children methods available on the playlists resource
  google
    .youtube("v3")
    .playlists.list({
      key: process.env.youtubeAPIKey,
      part: "snippet",
      channelId: "UCzF0IcIrSscr90-tuIMxxmw",
      maxResults: 50
    })
    .then(data => {
      // console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
};
