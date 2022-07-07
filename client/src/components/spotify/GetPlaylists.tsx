import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserPlaylists } from "../../slices/spotifySlice";
import { createSelector } from "reselect";

type Props = {};

const GetPlaylists = (props: Props) => {
  const dispatch = useAppDispatch();

  const [options, setOptions] = useState({
    limit: 50,
    offset: 0
  });

  //grab the initial status from the slice to use to prevent multiple re-renders
  let playlistStatus = useAppSelector((state) => state.spotify.status);
  // let playlistErrors = useAppSelector((state) => state.spotify.error);
  console.log(playlistStatus);
  // console.log(playlistErrors);

  //check global state of the playlist status and if idle, pull the data from the server
  useEffect(() => {
    // dispatch(getUserPlaylists(options));
    if (playlistStatus === "idle") {
      dispatch(getUserPlaylists(options));
    }
  }, []);

  //create a function using state to handle how many playlists to show on inital load and then on load more button click.
  let initialImagesToShow = 8;
  const [next, setNext] = useState(initialImagesToShow);
  const handleMoreImage = () => {
    setNext(next + 4);
  };

  const getMorePlaylists = () => {
    setOptions({
      limit: 50,
      offset: 50
    });
    dispatch(getUserPlaylists(options));
    setOptions({
      limit: 50,
      offset: 0
    });
  };

  //grab the newly set playlists global state from the dispatch to use to render out on the frontend
  const myPlaylists = useAppSelector((state) => state.spotify.playlists);
  console.log(myPlaylists);

  return (
    <>
      <h2 id="spotify-anchor">Spotify Playlists</h2>
      <div className="spotify">
        {/* on initial load, only display 8 images.
      on button click, increase next state which triggers a re-render, then the slice will slice from 0 - 8 + 4 = 12 to display */}
        {myPlaylists?.slice(0, next)?.map((list, index) => {
          // console.log(list);
          const { external_urls, description, name, images, id } = list;
          const { spotify } = external_urls ?? {};
          const [largeThumbnail] = images ?? [];
          const { url: largeThumbnailURL } = largeThumbnail ?? {};
          return (
            <div className="spotify__grid" key={index}>
              <a href={spotify}>
                <img src={largeThumbnailURL} alt={description} />
                <h3>{name}</h3>
              </a>
              <p>{description}</p>
              <a href={spotify}>
                <button>View tracklist</button>
              </a>
            </div>
          );
        })}
      </div>
      {/* only show the button if the number in state is lower than the total array length */}
      <div className="spotify__grid--loadmore">
        {next < myPlaylists?.length ? (
          <button onClick={() => handleMoreImage}>Load more</button>
        ) : (
          <button onClick={() => getMorePlaylists}>Load more</button>
        )}
      </div>
    </>
  );
};

export default GetPlaylists;
