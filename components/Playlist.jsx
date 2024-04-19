import Image from "next/image";
import { useSelector } from "react-redux";
import SongCardSmall from "./common/SongCardSmall";

export default function Playlist() {
  const {playlist}  = useSelector((state) => state.playlist);
  const  {index}  = useSelector((state) => state.playlist);
  console.log(playlist);
  console.log("index of the song id " + index);

  return (
    <>
      <div className="flex font-[lato] pb-40">
        <div className=" w-[30%] px-5 mt-10 ">
          <div className="w-auto">
            <div className="image  justify-center my-auto flex ">
              <Image
                src={playlist[index]?.imageLink}
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
            <div>
              <SongCardSmall
                image={song.imageLink}
                name={song.title}
                artistName={song.artist.name}
                i={index}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
