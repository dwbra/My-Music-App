import React from "react";
import "./App.scss";
import GetPlaylists from "./components/spotify/GetPlaylists";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import GetYoutubePlaylists from "./components/youtube/GetYoutubePlaylists";

function App() {
  return (
    <>
      <Navbar />
      <GetPlaylists />
      <GetYoutubePlaylists />
      <BackToTop />
    </>
  );
}

export default App;
