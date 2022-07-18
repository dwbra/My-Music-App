import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserPlaylists } from "../../slices/spotifySlice";

type Props = {};

const GetPlaylists = (props: Props) => {
  const dispatch = useAppDispatch();

  //useState to control when to display the fetch more Spotify Playlists button
  const [showGetMorePlaylistsButton, setshowGetMorePlaylistsButton] =
    useState(false);

  //grab the initial status from the slice to use to prevent multiple re-renders
  let playlistStatus = useAppSelector((state) => state.spotify.status);
  // let playlistErrors = useAppSelector((state) => state.spotify.error);
  let totalPlaylists = useAppSelector((state) => state.spotify.totalPlaylists);
  //grab the newly set playlists global state from the dispatch to use to render out on the frontend
  const myPlaylists = useAppSelector((state) => state.spotify.playlists);

  //check global state of the playlist status and if idle, pull the data from the server
  useEffect(() => {
    const options = { limit: 50, offset: 0 };
    if (playlistStatus === "idle") {
      dispatch(getUserPlaylists(options));
    }
  }, []);

  //on every re-render, check if the value of next is greater than the length of the current array.
  //if it is then show the button to get more playlists
  useEffect(() => {
    //only show the getMorePlaylistsButton if the next state is greater than the original playlists length
    //and if that length is not equal to the total array size returned from the server
    if (
      nextSpotify > myPlaylists?.length &&
      myPlaylists?.length !== totalPlaylists
    ) {
      setshowGetMorePlaylistsButton(true);
    } else {
      setshowGetMorePlaylistsButton(false);
    }
  });

  //create a function using state to handle how many playlists to show on inital load and then on load more button click.
  let initialImagesToShow = 8;
  const [nextSpotify, setNextSpotify] = useState(initialImagesToShow);
  const handleShowMoreSpotifyPlaylists = () => {
    setNextSpotify(nextSpotify + 4);
  };

  const [counter, setCounter] = useState(50);
  const getMoreSpotifyPlaylists = () => {
    //on each button click, increase counter by 50 so that the next dispatch will use the correct offset
    setCounter(counter + 50);
    const newOptions = { limit: 50, offset: counter };
    //ensure that no dispatch is sent if the total amount of playlists available equals the current array length
    if (totalPlaylists !== myPlaylists?.length) {
      dispatch(getUserPlaylists(newOptions));
    }
  };

  return (
    <>
      <h2 id="spotify-anchor">Spotify Playlists</h2>
      <div className="spotify">
        {/* on initial load, only display 8 images.
      on button click, increase next state which triggers a re-render, then the slice will slice from 0 - 8 + 4 = 12 to display */}
        {myPlaylists?.slice(0, nextSpotify)?.map((list, index) => {
          //deconstruct variables from the list object so that we can type
          const { external_urls, description, name, images, id } = list;
          // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#nullish-coalescing
          //the ?? operator - as a way to “fall back” to a default value when dealing with null or undefined
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
        {nextSpotify < myPlaylists?.length && (
          <button onClick={handleShowMoreSpotifyPlaylists}>Load more</button>
        )}
        {showGetMorePlaylistsButton && (
          <button
            id="getMoreSpotifyPlaylistsButton"
            onClick={getMoreSpotifyPlaylists}
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default GetPlaylists;
