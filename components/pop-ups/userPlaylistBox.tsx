import { getAllPlaylist } from "../../Query/userQuery";
import { useQuery } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const UserPlaylist: React.FC<{ onClose: any }> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const [playlists, setPlaylists] = useState([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>();
  const [isCreateNew, setIsCreateNew] = useState(false);
  const { loading, error, data, refetch } = useQuery(getAllPlaylist, {
    variables: { userId: user?.id },
  });

  useEffect(() => {
    if (data) {
      const playlistInfo = data.getUserById.playlist?.map(
        (playlistObj: any) => playlistObj // Assuming 'name' is the property containing the playlist name
      );
      setPlaylists(playlistInfo);
    }
  }, [data]);
  // Call refetch whenever the component re-renders
  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch]);

  // if user click on the playlist
  const handlePlaylistClick = (index: number, prePlaylist: any) => {
    setSelectedButtonIndex(index);
    setSelectedPlaylist(prePlaylist);
  };

  const handleCreateNew = () => {
    setIsCreateNew((prev) => !prev);
  };

  // input the data from the user
  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Add to the Playlist</DialogTitle>
      <DialogContent className="w-96">
        {isCreateNew ? (
          <div>
            <TextField
              className="mt-2"
              size="small"
              label="Create New Playlist"
              value={inputValue}
              onChange={handleChange}
            />
            <br />
          </div>
        ) : (
          <div
            onClick={handleCreateNew}
            className="text-sm text-blue-600 underline cursor-pointer"
          >
            Create New Playlist
          </div>
        )}

        <div className="mt-3">
          <div className="font=[lato] text-sm">Playlists :</div>
          <div className="mt-3">
            {playlists?.map((playlist: any, index: number) => (
              <Button
                key={index}
                onClick={() => handlePlaylistClick(index, playlist.id)}
                className={`bg-gray-300 rounded px-3 py-1 m-1 ${
                  selectedButtonIndex === index
                    ? "bg-gray-600 text-gray-200"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {playlist?.playlistName}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Close</Button>
        <Button
          onClick={() => onClose(true, inputValue, selectedPlaylist)}
          color="success"
        >
          add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserPlaylist;
