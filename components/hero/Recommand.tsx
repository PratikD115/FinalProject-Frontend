import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import { useQuery } from "@apollo/client";
import { recommandedSongs } from "../../Query/playlistQuery";
import {  playlistActions } from "../../store/playlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import SongCard from "../common/SongCard";
import { SongState } from "../../interface";
const Recommand: React.FC = () => {
  

  
  const { loading, error, data } = useQuery(recommandedSongs);
  const [playlist, setPlaylist] = useState<SongState[]>([]);
  const dispatch = useDispatch();
  const { songData } = useSelector((state: RootState) => state.favourite);
  useEffect(() => {
    if (data) {
      const { getAllActiveSongs } = data;
      setPlaylist(getAllActiveSongs);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSongClick = (playlist: SongState[], index: number) => {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
  };

  return (
    <>
      <section className="treading hero mt-7 pb-32">
        <Title title="Recommand for you" />
        <div className="grid grid-cols-2 gap-5">
          {playlist.map((item: SongState, index: number) => (
            <div className="" key={index}>
              <SongCard
                handleClick={() => handleSongClick(playlist, index)}
                imageLink={item.imageLink}
                songName={item.title}
                artistName={item.artist.name}
                songId={item.id}
                songUrl={item.streamingLink}
                liked={songData.includes(item.id)}
                type="small"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Recommand;
