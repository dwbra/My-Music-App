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

  return (
    <div>
      {myPlaylists.map((list) => (
        <div key={list["id"]}>
          <h1>{list["name"]}</h1>
        </div>
      ))}
    </div>
  );
};

export default GetPlaylists;
