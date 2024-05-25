import { userInfo, uploadImage } from "../../../Query/userQuery";
import ArtistCard from "../../../components/common/ArtistCard";
import Title from "../../../components/common/Title";
import Layout from "../../../components/layout/Layout";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../../store/playlistSlice";
import toast from "react-hot-toast";
import { userActions } from "../../../store/userSlice";
import { useRouter } from "next/router";
import { RootState } from "../../../store";
import { cloudinaryUpload } from "../../../utils/imageUpload";
import SongCard from "../../../components/common/SongCard";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const { data, refetch } = useQuery(userInfo, {
    variables: {
      userId: user?.id,
    },
  });
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [playlist, setPlaylist] = useState<any>([]);
  const [image, setImage] = useState<File | null>(null);
  const [uploadImageLink] = useMutation(uploadImage);
  const { songData } = useSelector((state: RootState) => state.favourite);

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    if (data) {
      const { getUserById } = data;
      setUserProfile(getUserById);
      setPlaylist(getUserById.favourite);
    }
  });

  const handleSongClick = (playlist: any, index: number) => {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
  };
  const handleArtistClick = (artistId: string) => {
    router.push(`/artist/${artistId}`);
  };

  const handleYourPlaylist = () => {
    router.push("/playlist");
  };

  const handleImageCancel = () => {
    setImage(null);
  };

  const handlePasswordChange = () => {
    console.log("change password");
  };
  const handleUpload = async () => {
    if (!image) {
      toast.error("No file selected");
      return;
    }
    const imageLink = await cloudinaryUpload(image, "user-Image");
    const { data } = await uploadImageLink({
      variables: {
        userId: user?.id,
        imageLink,
      },
    });
    if (data) {
      dispatch(userActions.updateProfile({ imageLink }));
      setImage(null);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ... font-[lato] text-white">
      <Layout>
        <div className=" flex sm:flex-col">
          <div className="w-[20%] sm:w-[100%]  ">
            <div className="card hero box w-52 m-auto mt-8  mx-auto  ">
              <div className=" flex justify-center mx-auto w-44 ">
                <button
                  onClick={() => {
                    const inputElement = document.getElementById("imageInput");
                    if (inputElement) {
                      inputElement.click();
                    }
                  }}
                >
                  <div className="rounded-full bg-black bg-opacity-50 flex justify-center items-center opacity-100 transition-opacity duration-300 hover:opacity-80">
                    <Image
                      src={profile || ""}
                      alt=""
                      height={200}
                      width={200}
                      className="h-44 rounded-full border-2 border-gray-500 cursor-pointer shadow-custom"
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className=" w-full flex justify-center">
              <div> {user?.email}</div>
              <div className=" flex justify-end w-auto ml-5">
                {!image && (
                  <button
                    className=" text-green-500"
                    onClick={() => {
                      const inputElement =
                        document.getElementById("imageInput");
                      if (inputElement) {
                        inputElement.click();
                      }
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </button>
                )}
                {image && (
                  <button
                    onClick={handleUpload}
                    className=" mr-2 text-green-500"
                  >
                    Upload
                  </button>
                )}
                {image && (
                  <button onClick={handleImageCancel} className=" text-red-500">
                    <CloseIcon />
                  </button>
                )}

                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <ul className="text-base mt-5">
              <li
                onClick={handlePasswordChange}
                className="flex items-center flex-col mb-2 text-gray-400 cursor-pointer bg-gray-800 py-1 rounded-md mx-2"
              >
               Change Password
              </li>
              <li
                onClick={handleYourPlaylist}
                className="flex items-center flex-col mb-2 text-gray-400 cursor-pointer bg-gray-800 py-1 rounded-md mx-2"
              >
                Your Playlist
              </li>
            </ul>
          </div>

          <div className="w-[80%] sm:w-[100%] px-5">
            <div className="mt-5">
              <Title title={"Your Favourite :"} />
              <div className="grid lg:grid-cols-6 grid-cols-5 sm:grid-cols-3 gap-5">
                {userProfile?.favourite?.map(
                  (item: SongInfo, index: number) => (
                    <div className="box card hero" key={index}>
                      <SongCard
                        handleClick={() => handleSongClick(playlist, index)}
                        imageLink={item.imageLink}
                        songName={item.title}
                        artistName={item.artist.name}
                        songId={item.id}
                        songUrl={item.streamingLink}
                        liked={songData.includes(item.id)}
                        type="large"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="mt-5">
              <Title title={"Followed Artist :"} />
              <div className="grid lg:grid-cols-6 grid-cols-4 sm:grid-cols- gap-5">
                {userProfile?.follow?.map((item: any, index: number) => (
                  <div key={index}>
                    <ArtistCard
                      onClick={() => handleArtistClick(item.id)}
                      artistImage={item.imageLink}
                      artistName={item.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
