import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getYoutubePlaylists } from "../../slices/youtubeSlice";

type Props = {};

const GetYoutubePlaylists = (props: Props) => {
  const dispatch = useAppDispatch();

  //grab the initial status from the slice to use to prevent multiple re-renders
  const playlistStatus = useAppSelector((state) => state.youtube.status);

  //check global state of the playlist status and if idle, pull the data from the server
  useEffect(() => {
    if (playlistStatus === "idle") {
      dispatch(getYoutubePlaylists());
    }
  });

  //grab the newly set playlists global state from the dispatch to use to render out on the frontend
  const myPlaylists = useAppSelector((state) => state.youtube.playlists);
  //   console.log(myPlaylists);

  return (
    <>
      <div>GetYoutubePlaylists</div>
    </>
  );
};

export default GetYoutubePlaylists;
