import { useDispatch, useSelector } from "react-redux";
import { searchArtist, searchSong } from "../Query/searchQuery";
import ArtistCard from "../components/common/ArtistCard";
import SongCardLarge from "../components/common/SongCardLarge";
import Title from "../components/common/Title";
import SearchBar from "../components/searchBar/SearchBar";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { playlistActions } from "../store/playlistSlice";
import { RootState } from "../store";
import debounce from "debounce";

interface ArtistInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  biography: string;
  imageLink: string;
  songs: SongInfo[];
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

const Browser: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [query, setQuery] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [songResult, setSongResult] = useState([]);
  const [artistResult, setArtistResult] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { songData } = useSelector((state: RootState) => state.favourite);

  // send request for songs
  const { data: searchedSong } = useQuery(searchSong, {
    variables: {
      search: query,
    },
    skip: !clicked,
  });

  const { data: searchedArtist } = useQuery(searchArtist, {
    variables: {
      search: query,
    },
    skip: !clicked,
  });

  const handleSearch = (query: string) => {
    if (query) {
      setQuery(query);
      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  const handleArtistClick = (id: string) => {
    router.push(`/artist/${id}`);
  };

  useEffect(() => {
    if (searchedSong) {
      // console.log("songresult");
      // console.log(searchedSong.searchSong);
      setSongResult(searchedSong.searchSong);
    }

    if (searchedArtist) {
      setArtistResult(searchedArtist.searchArtist);
    }
  }, [searchedSong, searchedArtist]);

  const handleSongClick = (playlist: any, index: number) => {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
  };
  return (
    <>
      <SearchBar onSearch={debounce(handleSearch, 1000)} />
      {!searchedSong && !searchedArtist && (
        <>
          <div className="text-gray-500 mt-10 text-xl">
            Search your favorite song and artist...
          </div>
        </>
      )}

      <div className="mt-10">
        {searchedSong && (
          <div className="">
            <div className="mb-10">
              <Title title={"Searched Song :"} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-1 gap-5">
              {songResult.map((song: SongInfo, index: number) => (
                <div className="h-52" key={index}>
                  <SongCardLarge
                    handleClick={() => handleSongClick(playlist, index)}
                    imageLink={song.imageLink}
                    songName={song.title}
                    artistName={song.artist.name}
                    songId={song.id}
                    songUrl={song.streamingLink}
                    liked={songData.includes(song.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-10">
        {searchedArtist && (
          <div className="">
            <div className="mb-10">
              <Title title={"Searched Artist :"} />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-1 gap-5">
              {artistResult.map((artist: any, index: number) => (
                <div className="mr-5" key={index}>
                  <ArtistCard
                    onClick={() => handleArtistClick(artist.id)}
                    artistImage={artist.imageLink}
                    artistName={artist.name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Browser;
