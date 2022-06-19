import React from "react";
import "./App.scss";
import GetPlaylists from "./components/spotify/GetPlaylists";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <GetPlaylists />
    </>
  );
}

export default App;
