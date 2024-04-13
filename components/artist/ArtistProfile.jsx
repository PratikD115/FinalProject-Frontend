import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const ARTIST = gql`
  query ($id: String!) {
    getArtistById(id: $id) {
      id
      name
      imageLink
      dateOfBirth
      nationality
      genres
      biography
      songs {
        id
        title
        genres
        language
        imageLink
      }
    }
  }
`;

export default function ArtistProfile() {
  const params = useParams();
  console.log(params);
  const { loading, error, data } = useQuery(ARTIST, {
    variables: {
      id: params?.artistId,
    },
  });
  const [artistInfo, setArtistInfo] = useState({});

  useEffect(() => {
    if (data) {
      const { getArtistById } = data;
      setArtistInfo(getArtistById);
    }
  }, [params, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className=" h-screen flex mt-5">
      <div className="w-[35%] p-6">
        <div className="flex justify-center">
          <Image
            src={artistInfo.imageLink}
            alt="profile"
            height={300}
            width={300}
            className="h-64 w-64 p-2 rounded-full"
          />
        </div>
        <div className="text-xl text-gray-300 font-bold flex items-center justify-start mt-4 pl-4">
          About {artistInfo.name}
        </div>
        <div className="text-base text-gray-400 mt-4 ">
          {artistInfo.biography}
        </div>
      </div>

      <div className="w-[60%] p-6">
        <div className="mt-10 text-gray-400 text-3xl">{artistInfo.name}</div>
        <div className="flex mt-10 ">
          <button className="rounded-full bg-red-500 px-8 mr-5 flex items-center py-2">
            <PlayArrowIcon />
            <span className="mb-1">Play Now</span>
          </button>
          <button className="rounded-full border-2 border-black  bg-slate-600 px-10 py-2">
            Follow
          </button>
        </div>
        <div>
          <div className="text-gray-400 text-2xl mt-7">
            {artistInfo.name} Songs
          </div>
          <div>
            {artistInfo.songs?.map((song) => (
              <div className="">{song.title}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
