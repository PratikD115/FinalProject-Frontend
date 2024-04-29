import React, { useEffect, useState } from "react";
import Title from "../common/Title";
import SongCardLarge from "../common/SongCardLarge";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { playlistActions } from "../../store/playlistSlice";
import { useDispatch } from "react-redux";

export default function SongPlaylist({ title, query }) {
  const { loading, error, data } = useQuery(query, {
    variables: { page: 2, limit: 10 },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    if (data) {
      const { getAllActiveSongs } = data;
      setPlaylist(getAllActiveSongs);
    }
  });

  function handleViewMore() {
    dispatch(playlistActions.setPlaylistAndIndex({ playlist, index: 0 }));
    router.push("/queue");
  }

  function handleSongClick(playlist, index) {
    dispatch(playlistActions.setPlaylistAndIndex({ playlist, index }));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
                cover={item.imageLink}
                name={item.title}
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
