import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import {
  addSongToPlaylist,
  createNewPlaylist,
  songDownload,
} from "../../Query/playlistQuery";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import ConfirmCard from "../pop-ups/dialogBox";
import { Menu, MenuItem } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ReactLoading from "react-loading";
import UserPlaylist from "../pop-ups/userPlaylistBox";
import { addToFavourite, removeToFavourite } from "../../Query/userQuery";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { favouriteActions } from "../../store/favoriteSlice";
import { red } from "@mui/material/colors";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface SongCardSmallProps {
  handleClick: () => void;
  imageLink: string;
  songName: string;
  artistName: string;
  songId: string;
  songUrl: string;
  liked: boolean;
}

const SongCardSmall: React.FC<SongCardSmallProps> = ({
  handleClick,
  imageLink,
  songName,
  artistName,
  songId,
  songUrl,
  liked,
}) => {
  const { isLogin } = useSelector((state: any) => state.user);
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [userPlaylist, setUserPlaylist] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSong] = useMutation(songDownload);
  const [createPlaylist] = useMutation(createNewPlaylist);
  const [songToPlaylist] = useMutation(addSongToPlaylist);
  const [error, setError] = useState<null | Error>(null);
  const [openAddConfirm, setOpenAddConfirm] = useState(false);
  const [openRemoveConfirm, setOpenRemoveCofirm] = useState(false);
  const dispatch = useDispatch();
  const [showBox, setShowBox] = useState(false);

  const handleDotsClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  async function closeUserPlaylist(result: boolean, name: string, id: string) {
    if (result) {
      if (id) {
        const { data } = await songToPlaylist({
          variables: {
            songId: songId,
            playlistId: id,
          },
        });
      } else if (name) {
        const { data } = await createPlaylist({
          variables: {
            userId: user?.id,
            playlistName: name,
            songId: songId,
          },
        });
      }
    }
    setUserPlaylist(false);
  }

  const base64ToBlob = (base64String: string) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "audio/mpeg" });
  };

  const fileName = user?.Id;

  async function handleDotsClose(options: string) {
    if (isLogin) {
      if (options === "add to playlist") {
        setUserPlaylist(true);
      } else if (options === "share") {
        setShowBox(true);
      } else if (options === "download") {
        try {
          setDownloading(true);
          const { data } = await downloadSong({
            variables: {
              url: songUrl,
            },
          });

          const blob = base64ToBlob(data.downloadSong);
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          setDownloading(false);
        } catch (error) {
          console.error("Error downloading file:", error);
          setDownloading(false);
        }
      }
      setAnchorEl(null);
    } else {
      toast.error("Please login to use functionality");
      setAnchorEl(null);
    }
  }
  const [addFavorite] = useMutation(addToFavourite, {
    onError: (err: Error) => {
      setError(err);
    },
  });

  const [removeFavorite] = useMutation(removeToFavourite, {
    onError: (err: Error) => {
      setError(err);
    },
  });
  const handleOpenAddConfirm = () => {
    if (isLogin) {
      setOpenAddConfirm(true);
    } else {
      toast.error("Please login to use functionality");
    }
  };

  const handleOpenRemoveConfirm = () => {
    if (isLogin) {
      setOpenRemoveCofirm(true);
    } else {
      toast.error("Please login to use functionality");
    }
  };

  const handleCloseAddConfirm = (agreed: boolean): void => {
    setOpenAddConfirm(false);
    if (agreed) {
      dispatch(favouriteActions.setSongToData(songId));
      addFavorite({
        variables: {
          userId: user?.id,
          songId: songId,
        },
      });
    } else {
      console.log("User disagreed.");
    }
  };
  const handleCloseRemoveConfirm = (agreed: boolean) => {
    setOpenRemoveCofirm(false);
    if (agreed) {
      dispatch(favouriteActions.removeSongToData(songId));
      removeFavorite({
        variables: {
          userId: user?.id,
          songId: songId,
        },
      });
    } else {
      console.log("User disagreed.");
    }
  };

  const handleWhatsAppClick = () => {
    // Replace the URL with your sharing URL
    window.open(
      "whatsapp://send?text=Check%20out%20this%20link:%20https://example.com",
      "_blank"
    );
  };

  const handleFacebookClick = () => {
    // Replace the URL with your sharing URL
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://example.com",
      "_blank"
    );
  };

  const handleLinkedInClick = () => {
    // Replace the URL with your sharing URL
    window.open(
      "https://www.linkedin.com/shareArticle?url=https://example.com",
      "_blank"
    );
  };

  const handleInstagramClick = () => {
    // Replace the URL with your Instagram profile URL
    window.open("https://www.instagram.com/", "_blank");
  };

  const handleCloseButtonClick = () => {
    setShowBox(false);
  };
  return (
    <>
     
      <div
        onClick={handleClick}
        className="box card relative flex hover:bg-gray-600  p-1 rounded-md transition ease-in-out cursor-pointer "
      >
        <div className="img relative h-16 w-16 ml-2 mr-7">
          <Image
            src={imageLink}
            alt="cover"
            height={64}
            width={64}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="absolute bottom-0 right-0 text-secondary">
          <div className="flex p-3">
            {liked ? (
              <FavoriteIcon
                onClick={handleOpenRemoveConfirm}
                sx={{ color: red[400] }}
                fontSize="small"
                className="mx-3"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handleOpenAddConfirm}
                fontSize="small"
                className="mx-3 text-white"
              />
            )}
            {/* open the confirmation box */}
            <ConfirmCard
              open={openAddConfirm}
              onClose={() => handleCloseAddConfirm(true)}
              desc={"Add Song to Favourite ? "}
              button={"Add"}
            />
            <ConfirmCard
              open={openRemoveConfirm}
              onClose={() => handleCloseRemoveConfirm(true)}
              desc={"remove song to Favourite ? "}
              button={"Remove"}
            />

            <BsThreeDots
              onClick={handleDotsClick}
              size={20}
              className="text-white"
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDotsClose}
            >
              <MenuItem onClick={() => handleDotsClose("add to playlist")}>
                <PlaylistAddIcon fontSize="small" className="mr-2" />
                Add to Playlist
              </MenuItem>
              <MenuItem onClick={() => handleDotsClose("share")}>
                <ShareIcon fontSize="small" className="mr-2" />
                Share
              </MenuItem>

              <MenuItem onClick={() => handleDotsClose("download")}>
                {downloading ? (
                  <ReactLoading
                    type="bars"
                    color="#2ecc71"
                    height={25}
                    width={25}
                    className="ml-9"
                  />
                ) : (
                  <div>
                    {" "}
                    <DownloadIcon fontSize="small" className="mr-2" />
                    Download
                  </div>
                )}
              </MenuItem>
            </Menu>
            {showBox && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-6 rounded shadow-md">
                <div className="flex justify-between mt-4 ">
                  <div className="mr-10" onClick={handleWhatsAppClick}>
                    <WhatsAppIcon sx={{ color: "#4caf50", fontSize: 40 }} />
                  </div>
                  <div className="mr-10" onClick={handleInstagramClick}>
                    <InstagramIcon sx={{ color: "#c13584", fontSize: 40 }} />
                  </div>
                  <div className="mr-10" onClick={handleFacebookClick}>
                    <FacebookIcon sx={{ color: "#1877f2", fontSize: 40 }} />
                  </div>
                  <div className="" onClick={handleLinkedInClick}>
                    <LinkedInIcon sx={{ color: "#0077B5", fontSize: 40 }} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className="mt-10 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded "
                    onClick={handleCloseButtonClick}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {userPlaylist && <UserPlaylist onClose={closeUserPlaylist} />}
          </div>
        </div>

        <div className="text mt-2">
          <h3 className="text-base text-gray-400 font-semibold">{songName}</h3>
          <span className="text-gray-500 font-semibold text-sm ">
            {artistName} -{songName}
          </span>
        </div>
      </div>
    </>
  );
};

export default SongCardSmall;
