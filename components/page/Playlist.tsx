import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../store/playlistSlice";
import { RootState } from "../../store";
import SongCard from "../common/SongCard";

const Playlist = () => {
  const { playlist } = useSelector((state: RootState) => state.playlist);
  const { index } = useSelector((state: RootState) => state.playlist);
  const dispatch = useDispatch();
  const { songData } = useSelector((state: RootState) => state.favourite);

  const handleSongClick = (index: number) => {
    dispatch(playlistActions.nextSong(index));
  };

  return (
    <>
      <div className="flex font-[lato] pb-40">
        <div className=" w-[30%] px-5 mt-10 ">
          <div className="w-auto">
            <div className="image  justify-center my-auto flex ">
              <Image
                src={playlist[index]?.imageLink}
                alt="song"
                height={255}
                width={255}
                className="border-2 rounded-md border-gray-500"
              />
            </div>
            <div className="title text-gray-400  text-xl flex justify-end mr-10 mt-2 ">
              {playlist[index]?.title}
            </div>
          </div>
          <div className="text-gray-500 text-2xl mt-5">Artist :</div>
          <div className="flex items-center text-gray-400 mt-2">
            <div className="img relative h-20 w-20">
              <Image
                src={playlist[index]?.artist.imageLink}
                alt="cover"
                width={558}
                height={558}
                objectFit="cover"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="ml-3">{playlist[index]?.artist.name}</div>
          </div>
        </div>
        <div className="w-[70%]  text-white px-5">
          <div className="text-3xl text-gray-400 my-7 mx-4 ">Playlist </div>
          {playlist?.map((song, index) => (
            <div key={index}>
              <SongCard
                handleClick={() => handleSongClick(index)}
                imageLink={song.imageLink}
                songName={song.title}
                artistName={song.artist.name}
                songId={song.id}
                songUrl={song.streamingLink}
                liked={songData.includes(song.id)}
                type="small"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Playlist;
