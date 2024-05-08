import HeaderHome from "../../../../components/header/HeaderHome";
import { useQuery } from "@apollo/client";
import { ArtistSong } from "../../../../Query/artistQuery";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongCardSmall from "../../../../components/common/SongCardSmall";
import Title from "../../../../components/common/Title";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { userActions } from "../../../../store/userSlice";
import { Genres, Language, Mood } from "../../../../Query/enum";
import { RootState } from "../../../../store";
const drawerWidth = 300;

export default function PermanentDrawer() {
  const [openMenu, setOpenMenu] = useState<number>(0);
  const [songData, setSongData] = useState([]);
  const { asArtist } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const songNameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const selectLanguageRef = useRef<HTMLSelectElement>(null);
  const selectGenresRef = useRef<HTMLSelectElement>(null);
  const selectMoodRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const dispatch = useDispatch();

  interface ArtistInfo {
    id: string;
    name: string;
    dateOfBirth: string;
    biography: string;
    imageLink: string;
    songs: SongInfo[];
  }

  interface SongInfo {
    id: string;
    title: string;
    imageLink: string;
    songUrl: string;
    songId: string;
    artist: ArtistInfo;
    streamingLink: string;
  }

  const { data } = useQuery(ArtistSong, {
    variables: {
      id: asArtist,
    },
  });
  const handleMenu = (index: number) => {
    setOpenMenu(index);
  };

  const handleSongImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleSongAudioChange = (event: any) => {
    setAudio(event.target.files[0]);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Access input values using refs

    if (!songNameRef.current?.value) {
      toast.error("enter name");
      return;
    }
    if (!selectGenresRef.current?.value) {
      toast.error("genres ");
      return;
    }
    if (!selectLanguageRef.current?.value) {
      toast.error("langauge");
      return;
    }
    if (!selectMoodRef.current?.value) {
      toast.error("Please mood");
      return;
    }

    console.log(songNameRef.current?.value);
    console.log(selectGenresRef.current?.value);
    console.log(selectLanguageRef.current?.value);
    console.log(selectMoodRef.current?.value);

    try {
      let genresArray = [];
      genresArray.push(selectGenresRef.current.value);

      // const { data } = await addUserToArtist({
      //   variables: {
      //     name: user?.name,
      //     userId: user?.id,
      //     dateOfBirth: dateRef.current.value.toString(),
      //     genres: genresArray,
      //     language: selectLanguageRef.current.value,
      //     biography: messageRef.current.value,
      //     imageLink: profile,
      //   },
      // });

      if (songNameRef.current) songNameRef.current.value = "";
      if (selectGenresRef.current) selectGenresRef.current.value = "";
      if (selectLanguageRef.current) selectLanguageRef.current.value = "";
      if (selectMoodRef.current) selectMoodRef.current.value = "";

      if (data) {
        toast.success("artist Profile create suceessfully");
        console.log(data);
        console.log(data.createUserToArtist.id);
        console.log(typeof data.createUserToArtist.id);
        dispatch(
          userActions.asArtist({ artistId: data.createUserToArtist.id })
        );

        router.push("/asArtist/home");
      }
    } catch {
      toast.error("failed to create artist profile ");
    }
  };

  useEffect(() => {
    if (data) {
      const { getArtistById } = data;
      setSongData(getArtistById.songs);
    }
  }, [data]);

  const handleSongClick = () => {
    console.log("artist click on the song ");
  };
  return (
    <div className="">
      <HeaderHome />
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-300  flex mt-[8vh]">
        <div className="bg-gray-950 w-[20%]">
          <ul className="pt-10">
            <li
              onClick={() => handleMenu(0)}
              className="w-full hover:bg-gray-500 py-3 text-white pl-[10%]"
            >
              All songs
            </li>
            <li
              onClick={() => handleMenu(1)}
              className="w-full hover:bg-gray-500 py-3 text-white pl-[10%]"
            >
              Create new songs
            </li>
          </ul>
        </div>
        <div className=" mt-2 min-h-screen w-full p-10">
          {openMenu === 0 && <Title title={"All Your Songs"} />}
          {openMenu === 0 &&
            songData?.map((item: SongInfo, index: number) => (
              <div key={index} className="">
                <SongCardSmall
                  handleClick={() => handleSongClick()}
                  imageLink={item.imageLink}
                  songName={item.title}
                  artistName={item.artist.name}
                  songId={item.id}
                  songUrl={item.streamingLink}
                  liked={false}
                />
              </div>
            ))}
          {openMenu === 1 && <Title title="Upload the Song" />}
          {openMenu === 1 && (
            <form onSubmit={handleSubmit} className=" p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                {/* select the title of the song  */}
                <div>
                  <label htmlFor="name" className="block text-gray-200 text-sm">
                    Please enter the song Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Song Name"
                    ref={songNameRef}
                    className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900 text-white rounded-md"
                  />
                </div>
                {/* select the genres of song  */}
                <div>
                  <label
                    htmlFor="selectField"
                    className="block text-gray-200 text-sm"
                  >
                    Select Your Song Genres
                  </label>
                  <select
                    id="selectField"
                    ref={selectGenresRef}
                    className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                  >
                    {Genres.map((item, index) => (
                      <option value={`${item}`}>{item}</option>
                    ))}
                  </select>
                </div>

                {/* select the language of song */}
                <div>
                  <label
                    htmlFor="selectField"
                    className="block text-gray-200 text-sm"
                  >
                    please your prefered song language
                  </label>
                  <select
                    id="selectField"
                    ref={selectLanguageRef}
                    className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                  >
                    {Language.map((item, index) => (
                      <option value={`${item}`}>{item}</option>
                    ))}
                  </select>
                </div>

                {/* select the mood of Song  */}
                <div>
                  <label
                    htmlFor="selectField"
                    className="block text-gray-200 text-sm"
                  >
                    please your prefered song mood
                  </label>
                  <select
                    id="selectField"
                    ref={selectMoodRef}
                    className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                  >
                    {Mood.map((item, index) => (
                      <option value={`${item}`}>{item}</option>
                    ))}
                  </select>
                </div>

                {/* select the song image */}
                <div>
                  <label
                    htmlFor="selectField"
                    className="block text-gray-200 text-sm"
                  >
                    please select the image
                  </label>

                  <input type="file" onChange={handleSongImageChange} />
                </div>

                {/* select the song audio */}
                <div>
                  <label
                    htmlFor="selectField"
                    className="block text-gray-200 text-sm"
                  >
                    please select the audio
                  </label>
                  <input type="file" onChange={handleSongAudioChange} />
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-5"
              >
                upload Song
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
