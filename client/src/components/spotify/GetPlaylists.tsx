import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUserPlaylists } from "../../slices/spotifySlice";

type Props = {};

const GetPlaylists = (props: Props) => {
  const dispatch = useAppDispatch();

  //grab the initial status from the slice to use to prevent multiple re-renders
  const playlistStatus = useAppSelector((state) => state.spotify.status);
  const myPlaylists = useAppSelector((state) => state.spotify.playlists);

  useEffect(() => {
    if (playlistStatus === "idle") {
      dispatch(getUserPlaylists());
    }
  }, []);

  console.log(playlistStatus);
  console.log(myPlaylists);

  return <div></div>;
};

export default GetPlaylists;
