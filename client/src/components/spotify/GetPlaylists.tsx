import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserPlaylists } from "../../slices/spotifySlice";

type Props = {};

const GetPlaylists = (props: Props) => {
  const dispatch = useAppDispatch();

  //grab the initial status from the slice to use to prevent multiple re-renders
  const playlistStatus = useAppSelector((state) => state.spotify.status);
  //grab the newly set playlists global state from the dispatch to use to render out on the frontend
  const myPlaylists = useAppSelector((state) => state.spotify.playlists);

  //check global state of the playlist status and if idle, pull the data from the server
  useEffect(() => {
    if (playlistStatus === "idle") {
      dispatch(getUserPlaylists());
    }
  });

  console.log(playlistStatus);
  console.log(myPlaylists);

  let initialImagesToShow = 8;
  const [next, setNext] = useState(initialImagesToShow);

  const handleMoreImage = () => {
    setNext(next + 4);
  };

  return (
    <>
      <div className="spotify">
        {/* on initial load, only display 8 images.
      on button click, increase next state which triggers a re-render, then the slice will slice from 0 - 8 + 4 = 12 to display */}
        {myPlaylists?.slice(0, next)?.map((list, index) => (
          <div className="spotify__grid" key={list["id"]} id="spotify-anchor">
            <a href={list["external_urls"]["spotify"]}>
              <img src={list["images"][0]["url"]} alt={list["description"]} />
              <h3>{list["name"]}</h3>
            </a>
            <p>{list["description"]}</p>
            <a href={list["external_urls"]["spotify"]}>
              <button>View tracklist</button>
            </a>
          </div>
        ))}
        {/* only show the button if the number in state is lower than the total array length */}
      </div>
      <div className="spotify__grid--loadmore">
        {next < myPlaylists?.length && (
          <button onClick={handleMoreImage}>Load more</button>
        )}
      </div>
    </>
  );
};

export default GetPlaylists;
