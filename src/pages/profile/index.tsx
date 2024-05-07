import { userInfo, uploadImage } from "../../../Query/userQuery";
import ArtistCard from "../../../components/common/ArtistCard";
import SongCardLarge from "../../../components/common/SongCardLarge";
import Title from "../../../components/common/Title";
import Layout from "../../../components/layout/Layout";
import { useMutation, useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../../store/playlistSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { userActions } from "../../../store/userSlice";
import { useRouter } from "next/router";

const Profile: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const { profile } = useSelector((state: any) => state.user);
  const router = useRouter();

  const { loading, error, data, refetch } = useQuery(userInfo, {
    variables: {
      userId: user?.id,
    },
  });
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [playlist, setPlaylist] = useState<any>([]);
  const [image, setImage] = useState<File | null>(null);
  const [uploadImageLink] = useMutation(uploadImage);
  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };
  const { songData } = useSelector((state: any) => state.favourite);

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
    console.log(artistId);
    router.push(`/artist/${artistId}`);
  };
  const handleUpload = async () => {
    let imageLink;
    if (!image) {
      toast.error("No file selected");
      return;
    }
 
    const upload_preset = "musicPlayer";
    const cloud_name = "ddiy656zq";
    try {
      const uploadData = new FormData();
      uploadData.append("file", image);
      uploadData.append("upload_preset", upload_preset);
      uploadData.append("cloud_name", cloud_name);
      uploadData.append("folder", "user-image");

      const loadingToastId = toast.loading("uploading photo", { duration: 0 });

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        uploadData
      );
      imageLink = data.url;

      await uploadImageLink({
        variables: {
          imageLink: data.url,
          userId: user?.id,
        },
      });

      toast.dismiss(loadingToastId);
      toast.success("photo uploaded successfully");
    } catch {
      toast.error("error uploading photo");
    }
    dispatch(userActions.updateProfile({ imageLink }));
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ... font-[lato] text-white">
      <Layout>
        <div className="flex">
          <div className="w-[20%] ">
            <div className="card hero box w-52 m-auto mt-8  mx-auto ">
              <div className=" flex justify-center mx-auto">
                <ArtistCard
                  artistImage={profile}
                  artistName={userProfile?.name}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="px-3 flex justify-end w-auto">
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleUpload}> upload</button>
            </div>
            <div className="mt-10">
              <Title title={"Your Playlists"} />
              <div className="">
                {userProfile?.playlist.map((playlist: any, index: number) => (
                  <div key={index}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: "#44454a", color: "white" }}
                      className="w-full my-1 "
                    >
                      {playlist.playlistName}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[80%] px-5">
            <div className="mt-5">
              <Title title={"Your Favourite :"} />
              <div className="grid grid-cols-3 md:grid-cols-6 sm:grid-cols-1 gap-5">
                {userProfile?.favourite?.map((item: any, index: number) => (
                  <div className="box card hero" key={index}>
                    <SongCardLarge
                      handleClick={() => handleSongClick(playlist, index)}
                      imageLink={item.imageLink}
                      songName={item.title}
                      artistName={item.artist.name}
                      songId={item.id}
                      songUrl={item.streamingLink}
                      liked={songData.includes(item.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <Title title={"Followed Artist :"} />
              <div className="grid grid-cols-3 md:grid-cols-5 sm:grid-cols-1 gap-5">
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
