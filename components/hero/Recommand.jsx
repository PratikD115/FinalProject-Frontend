import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import { useQuery } from "@apollo/client";
import SongCardSmall from "../common/SongCardSmall";
import { recommandedSongs } from "../../Query/playlistQuery";
import { playlistActions } from "../../store/playlistSlice";
import { useDispatch } from "react-redux";

export default function Recommand() {
  const { loading, error, data } = useQuery(recommandedSongs);
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const { getAllActiveSongs } = data;
      setPlaylist(getAllActiveSongs);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSongClick = (playlist, index) => {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
    console.log("click the button!!!!");
  };

  return (
    <>
      <section className="treading hero mt-7 pb-32">
        <Title title="Recommand for you" />
        <div className="grid grid-cols-2 gap-5">
          {playlist.map((item, index) => (
            <div className="" key={index}>
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
        </div>
      </section>
    </>
  );
}
