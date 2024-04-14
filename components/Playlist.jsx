import Image from "next/image";
import { useSelector } from "react-redux";
import SongCardSmall from "./common/SongCardSmall";

export default function Playlist() {
  const { playlist } = useSelector((state) => state);
  return (
    <>
      <div className="flex">
        <div className="w-[30%] border-2 border-red-500">
          {/* <Image src={} alt="" height={} width={} className="" /> */}
        </div>
        <div className="w-[70%] border-2 border-red-500 text-white">
          all the song playlist 
          {
            playlist?.map((song, index) => (
              <div>
                <SongCardSmall image={song.imageLink} name={song.title} artistName={song.artist.name} i={index} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
