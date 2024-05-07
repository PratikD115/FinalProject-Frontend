import * as React from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HeaderHome from "../../../../components/header/HeaderHome";
import { useQuery } from "@apollo/client";
import { ArtistSong } from "../../../../Query/artistQuery";
import { useState, useEffect } from "react";
const drawerWidth = 300;

export default function PermanentDrawer() {
  const [openSong, setOpenSong] = useState(false);
  const [songData, setSongData] = useState(null);
  const { loading, data, error } = useQuery(ArtistSong);
  const handleAllSong = () => {
    setOpenSong(true);
  };
  useEffect(() => {
    if (data) {
      setSongData(data);
    }
  }, [data]);

  return (
    <div className="bg-gray-500" style={{ display: "flex", marginTop: "64px" }}>
      <HeaderHome />
      <Paper
        sx={{
          width: drawerWidth,
          position: "fixed",
          top: "50px", // Adjust the top position to match the header height
          left: 0,
          bottom: 0,
          backgroundColor: "#212121",
          color: "#fff",
          zIndex: 1,
          marginTop: "16px", // Add margin to push the menu below the header
        }}
        elevation={4}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={handleAllSong}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="All Song" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="upload song" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
      <div className="pl-[18%] mt-2 min-h-screen">
        {openSong && songData && (
          <div className="text-3xl p-20">in the main </div>
        )}
      </div>
    </div>
  );
}
