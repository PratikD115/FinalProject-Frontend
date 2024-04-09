import Image from "next/image";
import React from "react";
import {  AiOutlineHeart } from "react-icons/ai";
import {  BsThreeDots } from "react-icons/bs";

export default function SongCardSmall({ cover, name, tag, i, show }) {
  return (
    <>
      <div
        className="box card relative flex hover:bg-gray-600  p-1 rounded-md transition ease-in-out cursor-pointer "
        key={i}
      >
        {show && (
          <div className="flex items-center text-lg text-gray-600 mr-5">
            {i + 1}
          </div>
        )}
        <div className="img relative h-16 w-16 ml-2 mr-7">
          <Image
            src={cover}
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
            {tag} -{name}
          </span>
        </div>
      </div>
    </>
  );
}
