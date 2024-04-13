import Image from "next/image";
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai";
import { BsPlayCircle, BsThreeDots } from "react-icons/bs";

export default function ArtistCard({onClick, image, name, tag }) {
  return (
    <>
      <div className="img relative h-60 rounded-full">
        <Image
          src={image}
          alt="cover"
          onClick={onClick}
          height={300}
          width={300}
          className="  w-full h-full object-cover bg-white rounded-full shadow-custom"
        />

        <div className="overlay absolute bottom-0 right-0 text-white">
          <div className="flex p-3">
            <AiOutlineHeart size={22} className="mx-3" />
            <BsThreeDots size={22} />
          </div>
        </div>
        <h3 className="text-md flex justify-center text-gray-500 font-semibold">
          {name}
        </h3>
      </div>
    </>
  );
}
