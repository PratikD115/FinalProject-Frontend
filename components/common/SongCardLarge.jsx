import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

export default function SongCardLarge({ cover, name, artistName }) {
  return (
    <>
      <div className="img relative h-40">
        <Image
          src={cover}
          alt="cover"
          height={288}
          width={288}
          className="w-full h-full object-cover rounded-md"
        />

        <div className="overlay absolute bottom-0 right-0 text-white">
          <div className="flex p-3">
            <AiOutlineHeart size={22} className="mx-3" />
            <BsThreeDots size={22} />
          </div>
        </div>
      </div>
      <div className="text mt-2">
        <h3 className="text-sm text-gray-400 font-medium">{name}</h3>
        <span className=" text-sm text-gray-300">{artistName}</span>
      </div>
    </>
  );
}
