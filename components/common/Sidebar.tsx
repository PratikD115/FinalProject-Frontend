import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { mostLikedSong } from "../../Query/playlistQuery";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../store/playlistSlice";
import { RootState } from "../../store";
import SongCard from "./SongCard";
import { Song } from "../../interface";
import { ScaleLoader } from "react-spinners";

const Sidebar: React.FC = () => {
  const { loading, error, data } = useQuery(mostLikedSong);
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();
  const { songData } = useSelector((state: RootState) => state.favourite);

  interface ArtistInfo {
    id: string;
    name: string;
    dateOfBirth: string;
    biography: string;
    imageLink: string;
    songs: Song[];
  }

  interface SongInfo {
    id: string;
    title: string;
    imageLink: string;
    songUrl: string;
    songId: string;
    artist: ArtistInfo;
    streamingLink: string;
  }
  useEffect(() => {
    if (data) {
      const { mostLikedSong } = data;
      setPlaylist(mostLikedSong);
    }
  }, [data]);

  const handleSongClick = (playlist: Song[], index: number) => {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
  };

  if (loading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader
          color="rgba(40, 189, 41, 1)"
          height={15}
          loading={true}
          margin={3}
          radius={3}
          speedMultiplier={2}
          width={4}
        />
      </div>
    );

  return (
    <>
      <section className="sidebar hero ">
        <Title title={" Most Liked songs"} />
        <div className="w-full">
          {playlist.map((item: SongInfo, index: number) => (
            <div key={index} className="mb-3 ">
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

export default Sidebar;
