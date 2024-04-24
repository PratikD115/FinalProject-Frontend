import { gql, useQuery } from "@apollo/client";
import SongCardSmall from "./SongCardSmall";
import Title from "./Title";
import { mostLikedSong } from "@/Query/playlistQuery";
export default function Sidebar() {
  const { loading, error, data } = useQuery(mostLikedSong);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <section className="sidebar hero">
        <Title title={" Most Liked songs"} />

        {data.getAllActiveSongs.map((item, i) => (
          <div key={i} className="mb-3">
            <SongCardSmall
              image={item.imageLink}
              name={item.title}
              artistName={item.artist.name}
              i={i}
            />
          </div>
        ))}
      </section>
    </>
  );
}
