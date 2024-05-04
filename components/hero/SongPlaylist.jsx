import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import SongCardLarge from "../common/SongCardLarge";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { playlistActions } from "../../store/playlistSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SongPlaylist({ title, playlistData }) {
  // const { loading, error, data } = useQuery(query, {
  //   variables: { page: 1, limit: 10 },
  // });
  const dispatch = useDispatch();
  const router = useRouter();
  const [playlist, setPlaylist] = useState([]);
  const { songData } = useSelector((state) => state.favourite);

  useEffect(() => {
    if (playlistData) {
      const { getAllActiveSongs } = playlistData;
      setPlaylist(getAllActiveSongs);
    }
  }, [playlistData]);

  function handleViewMore() {
    dispatch(playlistActions.setPlaylistAndIndex({ playlist, index: 0 }));
    router.push("/queue");
  }

  function handleSongClick(playlist, index) {
    dispatch(playlistActions.setPlaylistAndIndex({ playlist, index }));
  }

  return (
    <>
      <section className="treading hero mt-4 cursor-pointer">
        <div className="flex justify-between">
          <Title title={title} />
          <div
            onClick={handleViewMore}
            className="px-3 pt-1 h-7 mt-1 mb-1.5 mr-2 rounded-full bg-gray-600  hover:bg-gray-400 text-black
           text-sm"
          >
            View More
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-1 gap-5">
          {playlist?.map((item, index) => (
            <div className="box card hero" key={index}>
              <SongCardLarge
                handleClick={() => handleSongClick(playlist, index)}
                imageLink={item.imageLink}
                songName={item.title}
                artistName={item.artist.name}
                songId={item.id}
                songUrl={item.streamingLink}
                liked={songData.includes(item.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
