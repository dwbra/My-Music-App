import React from "react";
import "./App.scss";
import GetPlaylists from "./components/spotify/GetPlaylists";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import GetYoutubePlaylists from "./components/youtube/GetYoutubePlaylists";

function App() {
  return (
    <>
      <BackToTop />
      <Navbar />
      <GetPlaylists />
      <GetYoutubePlaylists />
    </>
  );
}

export default App;
