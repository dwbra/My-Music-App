import React from "react";
import "./App.scss";
import GetPlaylists from "./components/spotify/GetPlaylists";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
      <BackToTop />
      <Navbar />
      <GetPlaylists />
    </>
  );
}

export default App;
