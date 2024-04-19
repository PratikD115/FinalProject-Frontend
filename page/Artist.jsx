import { searchArtist, searchSong } from "@/Query/search";
import SongCardLarge from "@/components/common/SongCardLarge";
import Title from "@/components/common/Title";
import SearchBar from "@/components/searchBar/SearchBar";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function Artist() {
  const [clicked, setClicked] = useState(false);
  const [query, setQuery] = useState("");
  const { loading, error, data } = useQuery(searchSong, {
    variables: {
      search: query,
    },
    skip: !clicked,
  });
  const handleSearch = (query) => {
    setQuery(query);
    console.log(query);
    setClicked(true);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-10">
        {data && (
          <div className="">
            <div className="mb-10">
              {" "}
              <Title title={"Searched Song"} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-1 gap-5">
              {data.searchSong.map((song) => (
                <div className="h-52">
                  <SongCardLarge
                    cover={song.imageLink}
                    name={song.title}
                    artistName={song.artist.name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
