import Image from "next/image"
import React from "react"
import { AiFillPlayCircle, AiOutlineHeart } from "react-icons/ai"
import { BsPlayCircle, BsThreeDots } from "react-icons/bs"

export default function  Card_sm  ({ cover, name, tag, i, show })  {
  return (
    <>
      <div className='box card relative flex hover:bg-gray-200 p-1 rounded-md transition ease-in-out cursor-pointer' key={i}>
        {show && <div className='flex items-center text-lg text-gray-600 mr-5'>{i + 1}</div>}
        <div className='img relative h-16 w-16 mr-5'>
          <Image src={cover} alt='cover' height={64} width={64} className='w-full h-full object-cover rounded-md' />
        </div>
        <div className='overlay absolute bottom-0 right-0 text-secondary'>
          <div className='flex p-3'>
            <AiOutlineHeart size={22} className='mx-3' />
            <BsThreeDots size={22} />
          </div>
        </div>
        <div className='text'>
          <h3 className='text-md text-gray-500 font-semibold'>{name}</h3>
          <span className='text-gray-400'>{tag}</span>
        </div>
      </div>
    </>
  )
}
