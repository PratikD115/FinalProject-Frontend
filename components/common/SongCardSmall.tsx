import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

interface SongCardSmallProps {
  image: string;
  name: string;
  artistName: string;
  i: string;
}

const SongCardSmall: React.FC<SongCardSmallProps> = ({
  image,
  name,
  artistName,
  i,
}) => {
  return (
    <>
      <div
        className="box card relative flex hover:bg-gray-600  p-1 rounded-md transition ease-in-out cursor-pointer "
        key={i}
      >
        <div className="img relative h-16 w-16 ml-2 mr-7">
          <img
            src={image}
            alt="cover"
            height={64}
            width={64}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="overlay absolute bottom-0 right-0 text-secondary">
          <div className="flex p-3">
            <AiOutlineHeart size={20} className="mx-3" />
            <BsThreeDots size={20} />
          </div>
        </div>
        <div className="text mt-2">
          <h3 className="text-base text-gray-400 font-semibold">{name}</h3>
          <span className="text-gray-500 font-semibold text-sm ">
            {artistName} -{name}
          </span>
        </div>
      </div>
    </>
  );
};

export default SongCardSmall;
