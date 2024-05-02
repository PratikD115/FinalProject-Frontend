import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { ARTIST } from "../../Query/artistQuery";
import { playlistActions } from "../../store/playlistSlice";
import SongCardSmall from "../common/SongCardSmall";
import { addArtist } from "../../Query/userQuery";
import toast from "react-hot-toast";

interface ArtistInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  biography: string;
  imageLink: string;
  songs: Song[];
}

interface Song {
  id: string;
  title: string;
  imageLink: string;
}

export default function ArtistProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { loading, error, data } = useQuery(ARTIST, {
    variables: {
      id: router.query.artistId as string,
      page,
      limit,
    },
  });

  const [addArtistToFollow] = useMutation(addArtist);

  const [artistInfo, setArtistInfo] = useState<ArtistInfo>({
    id: "",
    name: "",
    dateOfBirth: "",
    biography: "",
    imageLink: "",
    songs: [],
  });

  useEffect(() => {
    if (data) {
      const { getArtistById } = data;
      setArtistInfo(getArtistById);
    }
  }, [router.query.artistId, data]);

  function handlePlayNow() {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist: artistInfo.songs,
        index: 0,
      })
    );
  }

  async function handleFollow() {
    const { data } = await addArtistToFollow({
      variables: {
        userId: user.id,
        artistId: router.query.artistId,
      },
    });
    toast.success(`Now, you are following , ${artistInfo.name}`)
  }

  function handleViewMore() {
    setLimit(20);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex pb-52">
      <div className="w-[30%] p-5">
        <div className="img relative h-64 w-64 m-auto">
          <Image
            src={artistInfo.imageLink}
            alt="cover"
            width={558}
            height={558}
            objectFit="cover"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="border border-gray-800 rounded-xl p-2 mt-5">
          <div className="text-2xl text-gray-300 flex items-center justify-start pl-4 font-[lato]">
            About {artistInfo.name}
          </div>
          <div className="text-base text-gray-400 mt-4 px-5">
            {artistInfo.biography}
          </div>
        </div>
      </div>

      <div className="w-[60%] p-6">
        <div className="flex items-center mt-10">
          <div className="text-gray-400 text-3xl font-bold mr-2 font-[lato]">
            {artistInfo.name}
          </div>
          <span className="text-sm text-gray-500 font-normal mt-2">
            ({artistInfo.dateOfBirth})
          </span>
        </div>
        <div className="flex mt-10 pl-5">
          <Button
            onClick={handlePlayNow}
            variant="contained"
            startIcon={<PlayArrowIcon />}
            className="rounded-full mr-5 pt-2 bg-green-500 hover:bg-green-600"
          >
            Play Now
          </Button>
          <Button
            variant="outlined"
            onClick={handleFollow}
            startIcon={<AddIcon />}
            className="rounded-full mr-5"
          >
            follow
          </Button>
        </div>
        <div>
          <div className="text-gray-400 text-2xl mt-10 ml-3">
            {artistInfo.name} Songs
          </div>
          <div className="mt-5">
            {artistInfo.songs?.map((song) => (
              <SongCardSmall
                key={song.id}
                image={song.imageLink}
                name={song.title}
                artistName={artistInfo.name}
                i={song.id}
              />
            ))}
          </div>
          <div className="flex justify-center ">
            <button onClick={handleViewMore} className="text-gray-500">
              view more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
