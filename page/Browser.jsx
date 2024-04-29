import { searchArtist, searchSong } from "../Query/searchQuery";
import ArtistCard from "../components/common/ArtistCard";
import SongCardLarge from "../components/common/SongCardLarge";
import Title from "../components/common/Title";
import SearchBar from "../components/searchBar/SearchBar";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Browser() {
  const [clicked, setClicked] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const {
    loading: songLoading,
    error: songError,
    data: songData,
  } = useQuery(searchSong, {
    variables: {
      search: query,
    },
    skip: !clicked,
  });
  const {
    loading: artistLoading,
    error: artistError,
    data: artistData,
  } = useQuery(searchArtist, {
    variables: {
      search: query,
    },
    skip: !clicked,
  });

  const handleSearch = (query) => {
    console.log("in the search function ");
    setQuery(query);
    console.log(query);
    setClicked(true);
  };

  const handleArtistClick = (id) => {
    router.push(`/artist/${id}`);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {!songData && !artistData && (
        <>
          <div className="text-gray-500 mt-10 text-xl">Search your favorite song and artist...</div>
        </>
      )}

      <div className="mt-10">
        {songData && (
          <div className="">
            <div className="mb-10">
              <Title title={"Searched Song :"} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-1 gap-5">
              {songData.searchSong.map((song) => (
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
      <div className="mt-10">
        {artistData && (
          <div className="">
            <div className="mb-10">
              <Title title={"Searched Artist :"} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-1 gap-5">
              {artistData.searchArtist.map((artist) => (
                <div className="mr-5">
                  <ArtistCard
                    onClick={() => handleArtistClick(artist.id)}
                    image={artist.imageLink}
                    name={artist.name}
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
