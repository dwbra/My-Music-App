import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

//get access to all of our env variables (API KEYS)
dotenv.config();

//Initialize NPM library
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.spotifyClient,
  clientSecret: process.env.spotifySecret
  //   redirectUri: process.env.spotifyURI
});

// Retrieve an access token for use in all spotify API calls
export const spotifyAuth = async (req, res) => {
  spotifyApi
    .clientCredentialsGrant()
    .then(data => {
      //log it out to the server (terminal on local) to view results
      // console.log("The access token expires in " + data.body["expires_in"]);
      // console.log("The access token is " + data.body["access_token"]);
      //save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch(err => {
      console.log("Something went wrong when retrieving an access token", err);
    });
};

export const getSpotifyPlaylists = async (req, res) => {
  // console.log(req);
  spotifyApi
    //customie the limit of the api call by passing an object as a param in the method
    .getUserPlaylists("danielworkman12", {
      limit: req.body.limit,
      offset: req.body.offset
    })
    .then(data => {
      console.log("Retrieved playlists", data.body);
      //https://expressjs.com/en/api.html#res.json
      res.json(data.body);
    })
    .catch(err => {
      console.log("Something went wrong!", err);
    });
};
