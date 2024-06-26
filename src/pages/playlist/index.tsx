import { useMutation, useQuery } from "@apollo/client";
import Header from "../../../components/header/Header";
import { deletePlaylist, userPlaylist } from "../../../Query/playlistQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import SongCard from "../../../components/common/SongCard";
import { playlistActions } from "../../../store/playlistSlice";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { SongState } from "../../../interface";

interface Song {
  title: string;
  streamingLink: string;
  imageLink: string;
  id: string;
  artist: Artist;
}
interface Artist {
  name: string;
}
interface Playlist {
  playlistName: string;
  songs: Song[];
  id: string;
}
const Playlist: React.FC = () => {
  const [playlistArr, setPlaylistArr] = useState<Playlist[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [showIndex, setShowIndex] = useState<number>(0);
  const [playlist, setPlaylist] = useState([]);
  const [playlistDelete] = useMutation(deletePlaylist);

  const { songData } = useSelector((state: RootState) => state.favourite);
  const { data, refetch } = useQuery(userPlaylist, {
    variables: {
      userId: user?.id,
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const {
        getUserById: { playlist },
      } = data;
      setPlaylistArr(playlist);
      setPlaylist(playlist[showIndex]?.songs);
    }
  }, [data, showIndex]);

  const handleSongClick = (playlist: SongState[], index: number) => {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
  };
  const handleDeletePlaylist = async (playlistId: string) => {
    await playlistDelete({
      variables: {
        playlistId: playlistId,
      },
    });
    if (refetch) {
      refetch();
    }
  };

  const selectPlaylist = (index: number) => {
    setShowIndex(index);
  };

  return (
    <div className="text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen pt-[8vh]">
      <Header />
      {playlistArr.length === 0 && (
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center pt-20 ">
            <div className="text-green-500 text-2xl ">Create your playlist</div>
            <div> create and enjoy your own playlist </div>
          </div>
        </div>
      )}
      {playlistArr.length !== 0 && (
        <div className="flex min-h-screen pt-10">
          <div className="w-[20%] flex pl-5 pt-5 flex-col">
            {playlistArr.map((playlist, index) => (
              <div
                className={`cursor-pointer ${
                  index === showIndex ? "text-green-500" : "text-white"
                }`}
                key={index}
                onClick={() => selectPlaylist(index)}
              >
                <button className="border-gray-200 py-1 rounded-lg mb-2 w-[90%] bg-gray-700 flex justify-between px-2">
                  <div> {playlist.playlistName}</div>
                  <div onClick={() => handleDeletePlaylist(playlist.id)}>
                    <DeleteTwoToneIcon
                      className={`cursor-pointer ${
                        index === showIndex ? "text-red-400" : "hidden"
                      }`}
                      fontSize="small"
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="w-[70%] ">
            <div className="grid  lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-3 gap-5">
              {playlistArr[showIndex].songs.map((song: Song, index: number) => (
                <div className="box card hero" key={index}>
                  <SongCard
                    handleClick={() => handleSongClick(playlist, index)}
                    imageLink={song.imageLink}
                    songName={song.title}
                    artistName={song.artist.name}
                    songId={song.id}
                    songUrl={song.streamingLink}
                    liked={songData.includes(song.id)}
                    type="large"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlist;
