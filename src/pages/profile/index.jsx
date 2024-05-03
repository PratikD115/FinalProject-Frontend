import { userInfo, uploadImageQuery } from "../../../Query/userQuery";
import ArtistCard from "../../../components/common/ArtistCard";
import SongCardLarge from "../../../components/common/SongCardLarge";
import Title from "../../../components/common/Title";
import Layout from "../../../components/layout/Layout";
import { useMutation, useQuery } from "@apollo/client";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const { loading, error, data, refetch } = useQuery(userInfo, {
    variables: {
      userId: user?.id,
    },
  });
  const [userProfile, setUserProfile] = useState();
  const [image, setImage] = useState(null);
  const [uploadImage] = useMutation(uploadImageQuery, {
    context: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    const fileJSON = {
      name: image.name,
      type: image.type,
      size: image.size,
      lastModified: image.lastModified,
      // Add more properties if needed
    };
    console.log(fileJSON);
    try {
      const response = await uploadImage({
        variables: {
          image: fileJSON,
          userId: user?.id,
        },
      });
      console.log(response.data.uploadImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setUserProfile(data.getUserById);
    }
  });

  return (
    <div className="min-h-screen  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ... font-[lato] text-white">
      <Layout>
        <div className="flex">
          <div className="w-[20%] ">
            <div className="card hero box w-52 m-auto mt-8  mx-auto ">
              <div className=" flex justify-center mx-auto">
                <ArtistCard
                  image={userProfile?.profile}
                  name={userProfile?.name}
                />
              </div>
            </div>
            <br />
            <br />
            <div className="px-3 flex justify-end w-auto">
              <input type="file" onChange={handleImageChange} />

              <EditIcon
                onClick={handleUpload}
                fontSize="small"
                className="text-gray-500 hover:text-gray-200"
              />
            </div>
            <div className="mt-10">
              <Title className="text-sm" title={"Your Playlists"} />
              <div className="">
                {userProfile?.playlist.map((playlist, index) => (
                  <Button
                    variant="contained"
                    size="small"
                    className="w-full my-1 bg-gray-500 hover:bg-gray-400"
                  >
                    {playlist.playlistName}
                  </Button>
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
                      name={item.title}
                      artistName={item.artist.name}
                      songId={item.id}
                      songUrl={item.streamingLink}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <Title title={"Followed Artist :"} />
              <div className="grid grid-cols-3 md:grid-cols-5 sm:grid-cols-1 gap-5">
                {userProfile?.follow?.map((item, i) => (
                  <ArtistCard image={item.imageLink} name={item.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
