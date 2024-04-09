import { recommand } from "../../public/data/data";
import Card_sm from "./Card_sm";
import { gql, useQuery } from "@apollo/client";
import SongCardSmall from "./SongCardSmall";
const mostLikedSong = gql`
  query {
    getAllActiveSongs(limit: 7) {
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

export default function Sidebar() {
  const { loading, error, data } = useQuery(mostLikedSong);
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <section className="sidebar hero">
        <h1 className="mb-5 text-lg font-semibold text-gray-600 ">
          Most Liked songs
        </h1>
        {data.getAllActiveSongs.map((item, i) => (
          <div key={i} className="mb-3">
            <SongCardSmall
              cover={item.imageLink}
              name={item.title}
              tag={item.artist.name}
              i={i}
            />
          </div>
        ))}
      </section>
    </>
  );
}
