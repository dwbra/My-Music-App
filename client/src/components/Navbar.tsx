import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <div className="navbar__heading">
        <h1>Welcome to Daniels SPA of Musical Delights</h1>
      </div>
      <div className="navbar__content">
        <h5>
          Please click on any of the links below to view the corresponding
          section.
        </h5>
        <div>
          <a href="#spotify-anchor">Spotify</a>
          {/* not currently allowing new api users */}
          {/* <a href="#">Soundcloud</a> */}
          <a href="#youtube-anchor">Youtube</a>
          {/* not currently allowing new api users */}
          {/* <a href="#">Songkick</a> */}
          <a href="#">Eventbrite</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
