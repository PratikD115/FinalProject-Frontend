import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { ARTIST, artistSong } from "../../Query/artistQuery";
import { playlistActions } from "../../store/playlistSlice";
import { addArtist, removeArtist } from "../../Query/userQuery";
import toast from "react-hot-toast";
import { favouriteActions } from "../../store/favoriteSlice";
import { RootState } from "../../store";
import { ScaleLoader } from "react-spinners";
import SongCard from "../common/SongCard";
import { Artist, Song } from "../../interface";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export interface ArtistInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  biography: string;
  imageLink: string;
  songs: Song[];
}

export interface SongInfo {
  id: string;
  title: string;
  imageLink: string;
  songUrl: string;
  songId: string;
  artist: ArtistInfo;
  streamingLink: string;
}

export default function ArtistProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mainIndex, setMainIndex] = useState<number>(0);
  const [playlist, setPlaylist] = useState([[]]);
  const { user } = useSelector((state: RootState) => state.user);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { songData } = useSelector((state: RootState) => state.favourite);
  const { artistData } = useSelector((state: RootState) => state.favourite);
  const [addArtistToFollow] = useMutation(addArtist);
  const [removeArtistToFollow] = useMutation(removeArtist);
  const [hasMore, setHasMore] = useState(true);

  const { loading, data } = useQuery(ARTIST, {
    variables: {
      id: router.query.artistId,
    },
  });

  const { loading: songsLoading, data: songsData } = useQuery(artistSong, {
    variables: {
      id: router.query.artistId,
      page,
      limit,
    },
  });

  const [artistInfo, setArtistInfo] = useState<Partial<Artist>>({
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
  }, [data]);

  useEffect(() => {
    if (songsData) {
      const { getArtistById } = songsData;

      if (getArtistById.songs.length < 10) {
        setHasMore(false);
      }
      console.log(getArtistById.songs);
      setPlaylist((prevPages) => {
        const newPages = [...prevPages];
        newPages[page - 1] = getArtistById.songs;
        return newPages;
      });
    }
  }, [songsData]);

  function handlePlayNow() {
    const flatPlaylist = playlist.flat();
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist: flatPlaylist,
        index: 0,
      })
    );
  }

  function handleSongClick(index: number, songIndex: number) {
    const flatPlaylist = playlist.flat();
    const finalIndex = index * 10 + songIndex;
    console.log(flatPlaylist);
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist: flatPlaylist,
        index: finalIndex,
      })
    );
  }

  const handleFollow = async () => {
    if (artistInfo.id)
      dispatch(favouriteActions.setArtistToData(artistInfo?.id));
    await addArtistToFollow({
      variables: {
        userId: user?.id,
        artistId: router.query.artistId,
      },
    });
    toast.success(`Now, you are following , ${artistInfo.name}`);
  };
  async function handleUnfollow() {
    try {
      if (artistInfo.id) {
        dispatch(favouriteActions.removeArtistToData(artistInfo.id));
      }

      await removeArtistToFollow({
        variables: {
          userId: user?.id,
          artistId: router.query.artistId,
        },
      });
      toast.success(`Now, you are unfollow , ${artistInfo.name}`);
    } catch (error: any) {
      toast.error(error);
    }
  }

  function handleViewMore() {
    if (mainIndex + 1 === page) {
      setPage((prev) => prev + 1);
      setMainIndex((prev) => prev + 1);
    } else {
      setMainIndex((prev) => prev + 1);
      if (mainIndex + 2 === page) {
        setHasMore(false);
      }
    }
  }

  function handleViewLess() {
    console.log(mainIndex + 1);

    setMainIndex((prev) => {
      if (prev < 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
    setHasMore(true);
  }

  if (loading)
    return (
      <div className=" h-screen flex justify-center items-center">
        <ScaleLoader
          color="rgba(40, 189, 41, 1)"
          height={15}
          loading={true}
          margin={3}
          radius={3}
          speedMultiplier={2}
          width={4}
        />
      </div>
    );

  return (
    <div className="flex pb-52">
      <div className="w-[30%] p-5">
        <div className="img relative h-64 w-64 m-auto">
          {artistInfo.imageLink && (
            <Image
              src={artistInfo.imageLink}
              alt="cover"
              width={558}
              height={558}
              objectFit="cover"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>

        <div className="border border-gray-800 rounded-xl p-2 mt-5">
          <div className="text-2xl text-gray-300 flex items-center justify-start pl-4 font-[lato]">
            About {artistInfo.name}
          </div>
          <div className="text-base text-gray-400 mt-4 px-5 text-justify">
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
          {artistInfo.id && artistData?.includes(artistInfo.id) ? (
            <Button
              variant="outlined"
              onClick={handleUnfollow}
              startIcon={<AddIcon />}
              className="rounded-full mr-5"
            >
              following
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={handleFollow}
              startIcon={<AddIcon />}
              className="rounded-full mr-5"
            >
              follow
            </Button>
          )}
        </div>
        <div>
          <div className="text-gray-400 text-2xl mt-10 ml-3">
            {artistInfo.name} Songs
          </div>
          <div className="mt-5">
            {playlist?.map((pages: Song[], index: number) => {
              if (index <= mainIndex) {
                return (
                  <div className="" key={index}>
                    {pages.map((song: Song, songIndex: number) => (
                      <SongCard
                        handleClick={() => {
                          handleSongClick(index, songIndex);
                        }}
                        imageLink={song.imageLink}
                        songName={song.title}
                        artistName={artistInfo.name || " "}
                        songId={song.id}
                        songUrl={song.streamingLink}
                        liked={songData.includes(song.id)}
                        type="small"
                      />
                    ))}
                  </div>
                );
              }
            })}
          </div>
          <div className="flex justify-between w-28 m-auto mt-10 bg-slate-700 rounded-md">
            <div className="w-14 flex justify-center ">
              {mainIndex !== 0 && (
                <button onClick={handleViewLess} className="text-green-500">
                  <ArrowDropUpIcon fontSize="large" />
                </button>
              )}
            </div>
            <Divider
              orientation="vertical"
              color="white"
              variant="middle"
              flexItem
            />
            <div className="w-14 flex justify-center ml-1">
              {hasMore && (
                <button onClick={handleViewMore} className="text-green-500">
                  <ArrowDropDownIcon fontSize="large" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
