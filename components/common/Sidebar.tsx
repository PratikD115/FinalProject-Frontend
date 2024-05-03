import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SongCardSmall from "./SongCardSmall";
import { mostLikedSong } from "../../Query/playlistQuery";
import Title from "./Title";
import { useDispatch } from "react-redux";
import { playlistActions } from "../../store/playlistSlice";
export default function Sidebar() {
  const { loading, error, data } = useQuery(mostLikedSong);
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const { getAllActiveSongs } = data;
      setPlaylist(getAllActiveSongs);
    }
  }, [data]);

  function handleSongClick(playlist: any, index: number) {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section className="sidebar hero ">
        <Title title={" Most Liked songs"} />

        {data.getAllActiveSongs.map((item: any, index: number) => (
          <div key={index} className="mb-3">
            <SongCardSmall
              handleClick={() => handleSongClick(playlist, index)}
              imageLink={item.imageLink}
              songName={item.title}
              artistName={item.artist.name}
              songId={item.id}
              songUrl={item.streamingLink}
            />
          </div>
        ))}
      </section>
    </>
  );
}
