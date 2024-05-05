import Image from "next/image";
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";

interface ArtistCardProps {
  onClick?: () => void;
  artistImage: string;
  artistName: string;
 
}

export default function ArtistCard({
  onClick,
  artistImage,
  artistName,
  
}: ArtistCardProps) {
  return (
    <>
      <div className="relative h-44 rounded-full border-2 border-gray-500 cursor-pointer">
        
        {artistImage && <Image
          src={ artistImage}
          alt="cover"
          onClick={onClick}
          height={300}
          width={300}
          className="w-full h-full object-cover bg-white rounded-full shadow-custom"
        />}
        {/* <div className="overlay absolute bottom-0 right-0 text-white">
          <div className="flex p-3">
            <AiOutlineHeart size={22} className="mx-3" />
            <BsThreeDots size={22} />
          </div>
        </div> */}
        <h3 className="text-md flex justify-center text-gray-500 font-semibold">
          {artistName}
        </h3>
      </div>
    </>
  );
}
