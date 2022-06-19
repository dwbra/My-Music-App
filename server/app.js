import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import spotifyRoutes from "./routes/spotifyRoutes.js";

// //initiate express to be able to call methods from.
const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());

// //use express to set the route paths for various APIS
app.use("/spotify", spotifyRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  //Log a message to terminal to show that connection is successful
  console.log(`Listening on port ${PORT}`);
});
