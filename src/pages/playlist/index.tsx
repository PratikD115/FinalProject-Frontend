import { useQuery } from "@apollo/client";
import Header from "../../../components/header/Header";
import { userPlaylist } from "../../../Query/playlistQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import Title from "../../../components/common/Title";

interface Song {
  title: string;
  streamingLink: string;
  imageLink: string;
  id: string;
}
interface Playlist {
  playlistName: string;
  songs: Song;
}
const Playlist: React.FC = () => {
  const [playlistArr, setPlaylistArr] = useState<Playlist[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [showIndex, setShowIndex] = useState<number>();
  const { loading, error, data } = useQuery(userPlaylist, {
    variables: {
      userId: user?.id,
    },
  });
  useEffect(() => {
    if (data) {
      const {
        getUserById: { playlist },
      } = data;
      setPlaylistArr(playlist);
      console.log(playlist);
    }
  }, []);

  return (
    <div className="text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen pt-[8vh]">
      <Header />
      {playlistArr.length === 0 && (
        <div className="flex justify-center pt-20 ">
          <div className="text-green-500 text-2xl ">
            Create your playlist
          </div>
          <div> create and enjoy your own playlist </div>
        </div>
      )}
      {playlistArr.length !== 0 &&
        playlistArr.map((item, index) => (
          <div className="">
            <div className="text-xl">{playlistArr[index].playlistName}</div>
            {showIndex}
          </div>
        ))}
    </div>
  );
};

export default Playlist;
