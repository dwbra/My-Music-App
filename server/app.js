import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import spotifyRoutes from "./routes/spotifyRoutes.js";
import { spotifyAuth } from "./controllers/spotifyController.js";

import youtubeRoutes from "./routes/youtubeRoutes.js";

//initiate express to be able to call methods from.
const app = express();
//gain access to our environment variables
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());

//use express to set the route paths for various APIS
//use express Application-level middleware to run the spotify auth function every time the app receives a request.
///https://expressjs.com/en/guide/using-middleware.html
// app.use("/spotify", (req, res, next) => {
//   spotifyAuth();
//   next();
// });
app.use("/spotify", spotifyRoutes);
app.use("/youtube", youtubeRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  spotifyAuth();
  //Log a message to terminal to show that connection is successful
  console.log(`Listening on port ${PORT}`);
});
