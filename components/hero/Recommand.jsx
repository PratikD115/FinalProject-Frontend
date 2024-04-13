import React from "react";
import { recommand } from "../../public/data/data";
import Title from "../common/Title";
import { gql, useQuery } from "@apollo/client";
import SongCardSmall from "../common/SongCardSmall";

const recommandedSongs = gql`
  query {
    getAllActiveSongs {
      id
      title
      artist {
        id
        name
      }
      duration
      imageLink
    }
  }
`;
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
