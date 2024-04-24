import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import AlertDialog from "../pop-ups/dialogBox";
import { useSelector } from "react-redux";
import { Alert, Menu, MenuItem, Snackbar } from "@mui/material";
import AutohideSnackbar from "../pop-ups/information";
import { useRouter } from "next/router";
import { addToFavourite } from "@/Query/userQuery";
import { useMutation, useQuery } from "@apollo/client";
import UserPlaylist from "../pop-ups/userPlaylist";
import {
  addSongToPlaylist,
  createNewPlaylist,
  songDownload,
} from "@/Query/playlistQuery";
import { SendToMobileRounded } from "@mui/icons-material";

export default function SongCardLarge({
  handleClick,
  cover,
  name,
  artistName,
  songId,
  songUrl,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const { isLogin } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userPlaylist, setUserPlaylist] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSong] = useMutation(songDownload);
  const [createPlaylist] = useMutation(createNewPlaylist);
  const [songToPlaylist] = useMutation(addSongToPlaylist);

  const handleDotsClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  async function closeUserPlaylist(result, name, id) {
    console.log(result);
    if (result) {
      if (id) {
        console.log(id);
        console.log("want to add song");
        const { data } = await songToPlaylist({
          variables: {
            songId: songId,
            playlistId: id,
          },
        });
      } else if (name) {
        console.log(name);
        console.log("want to create new Playlist");
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
  const base64ToBlob = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "audio/mpeg" });
  };
  const fileName = user?.Id;

  async function handleDotsClose(options) {
    if (isLogin) {
      if (options === "add to playlist") {
        console.log("playlist");
        setUserPlaylist(true);
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
      setOpen(true);
      setAnchorEl(null);
    }
  }

  const [addFavorite, { loading }] = useMutation(addToFavourite, {
    onError: (err) => {
      setError(err);
    },
  });

  const handleOpenDialog = () => {
    if (isLogin) {
      setOpenDialog(true);
    } else {
      setOpen(true);
      // router.push('/login');
    }
  };

  const handleCloseDialog = (agreed) => {
    setOpenDialog(false);
    if (agreed) {
      const { data } = addFavorite({
        variables: {
          userId: user?.id,
          songId: songId,
        },
      });
    } else {
      console.log("User disagreed.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="img relative h-40">
        <Image
          onClick={handleClick}
          src={cover}
          alt="cover"
          height={288}
          width={288}
          className="w-full h-full object-cover rounded-md"
        />

        <div className="overlay absolute bottom-0 right-0 text-white">
          <div className="flex p-3">
            <AiOutlineHeart
              onClick={handleOpenDialog}
              size={22}
              className="mx-3"
            />
            <AlertDialog open={openDialog} onClose={handleCloseDialog} />

            <BsThreeDots onClick={handleDotsClick} size={22} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDotsClose}
            >
              <MenuItem onClick={() => handleDotsClose("add to playlist")}>
                Add to Playlist
              </MenuItem>
              <MenuItem onClick={() => handleDotsClose("download")}>
                Download
              </MenuItem>
            </Menu>
            {userPlaylist && <UserPlaylist onClose={closeUserPlaylist} />}
          </div>
        </div>
        {open && (
          <AutohideSnackbar
            open={open}
            onClose={handleClose}
            message={"Please Login to use Functionality"}
          />
        )}
      </div>
      <div className="text mt-1 font-[lato]">
        <h3 className="text-sm text-gray-300 font-medium">{name}</h3>
        <span className=" text-sm text-gray-400">{artistName}</span>
      </div>
    </>
  );
}
