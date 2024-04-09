import React from "react";
import Title from "../common/Title";
import SongCardLarge from "../common/SongCardLarge";
import { gql, useQuery } from "@apollo/client";

const songDetails = gql`
  query {
    getAllActiveSongs(page: 2, limit: 10) {
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

export default function New() {
  const { loading, error, data } = useQuery(songDetails);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <section className="treading hero mt-4">
        <div className="flex justify-between">
          <Title title="Hindi Top 50" />
          <div
            className="px-3 pt-1 h-7 mt-1 mb-1.5 mr-2 rounded-full bg-gray-600  hover:bg-gray-400 text-black
           text-sm"
          >
          
            View More
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-1 gap-5">
          {data.getAllActiveSongs.map((item, i) => (
            <div className="box card hero" key={item.id}>
              <SongCardLarge
                cover={item.imageLink}
                name={item.title}
                artistName={item.artist.name}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
