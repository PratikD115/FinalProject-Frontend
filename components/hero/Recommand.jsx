import React from "react";
import Title from "../common/Title";
import {  useQuery } from "@apollo/client";
import SongCardSmall from "../common/SongCardSmall";
import { recommandedSongs } from "@/Query/playlistQuery";

export default function Recommand() {
  const { loading, error, data } = useQuery(recommandedSongs);
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
      <section className="treading hero mt-7 pb-32">
        <Title title="Recommand for you" />
        <div className="grid grid-cols-2 gap-5">
          {data.getAllActiveSongs.map((item, i) => (
            <SongCardSmall
              key={i}
              image={item.imageLink}
              name={item.title}
              artistName={item.artist.name}
              i={item.id}
            />
          ))}
        </div>
      </section>
    </>
  );
}
