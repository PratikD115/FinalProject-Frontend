import { userInfo, uploadImageQuery } from "../../../Query/userQuery";
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

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const { loading, error, data, refetch } = useQuery(userInfo, {
    variables: {
      userId: user?.id,
    },
  });
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState();
  const [playlist, setPlaylist] = useState([]);
  const [image, setImage] = useState(null);
  const [uploadImage] = useMutation(uploadImageQuery, {
    context: {
      headers: {
        "Content-Type": "multipart/form-data",
        "apollo-require-preflight": true,
      },
    },
  });
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    console.log(image);
    uploadImage({
      variables: {
        image: image,
        userId: user?.id,
      },
    });
  };
  const { songData } = useSelector((state) => state.favourite);

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

  const handleSongClick = (playlist, index) => {
    dispatch(
      playlistActions.setPlaylistAndIndex({
        playlist,
        index,
      })
    );
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ... font-[lato] text-white">
      <Layout>
        <div className="flex">
          <div className="w-[20%] ">
            <div className="card hero box w-52 m-auto mt-8  mx-auto ">
              <div className=" flex justify-center mx-auto">
                <ArtistCard
                  onClick={() => handleClick(item.id)}
                  artistImage={userProfile?.profile}
                  artistName={userProfile?.name}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="px-3 flex justify-end w-auto">
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className="mt-10">
              <Title className="text-sm" title={"Your Playlists"} />
              <div className="">
                {userProfile?.playlist.map((playlist, index) => (
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
                {userProfile?.favourite?.map((item, index) => (
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
                {userProfile?.follow?.map((item, index) => (
                  <div key={index}>
                    <ArtistCard
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
}
