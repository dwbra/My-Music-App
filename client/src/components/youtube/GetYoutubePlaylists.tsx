import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getYoutubePlaylists } from "../../slices/youtubeSlice";

type Props = {};

const GetYoutubePlaylists = (props: Props) => {
  const dispatch = useAppDispatch();

  const youtubePlaylistStatus = useAppSelector((state) => state.youtube.status);

  useEffect(() => {
    if (youtubePlaylistStatus === "idle") {
      dispatch(getYoutubePlaylists());
    }
  });

  let initialImagesToShow = 4;
  const [youtubeNext, setYoutubeNext] = useState(initialImagesToShow);
  const handleShowMoreYoutubePlaylists = () => {
    setYoutubeNext(youtubeNext + 4);
  };

  const myYoutubePlaylists = useAppSelector((state) => state.youtube.playlists);
  // console.log(myYoutubePlaylists);

  return (
    <>
      <h2 id="youtube-anchor">Youtube Playlists</h2>
      <div className="youtube">
        {myYoutubePlaylists?.slice(0, youtubeNext)?.map((list, index) => {
          const { snippet, id } = list;
          const youtubePlaylistURL = `https://www.youtube.com/watch?v=QrR_gm6RqCo&list=${id}`;
          const { localized, thumbnails } = snippet ?? {};
          const { description, title } = localized ?? {};
          const { maxres, high } = thumbnails ?? {};
          const { url: largeThumbnailURL } = high ?? "";
          return (
            <div className="youtube__grid" key={index}>
              <a href={youtubePlaylistURL}>
                <img src={largeThumbnailURL} alt={description} />
                <h3>{title}</h3>
              </a>
              <p>{description}</p>
              <a href={youtubePlaylistURL}>
                <button>View tracklist</button>
              </a>
            </div>
          );
        })}
      </div>
      <div className="youtube__grid--loadmore">
        {youtubeNext < myYoutubePlaylists?.length && (
          <button onClick={handleShowMoreYoutubePlaylists}>Load more</button>
        )}
      </div>
    </>
  );
};

export default GetYoutubePlaylists;
