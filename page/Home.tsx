import React from "react";
import Hero from "../components/hero/Hero";
import Recommand from "../components/hero/Recommand";
import LayoutSidebar from "../components/layout/LayoutSidebar";
import PopulerArtist from "../components/hero/PopulerArtist";
import {
  englishTop20Playlist,
  hindiTop20Playlist,
  punjabiTop20Playlist,
} from "../Query/playlistQuery";
import SongPlaylist from "../components/hero/SongPlaylist";
import { useQuery } from "@apollo/client";

const Home: React.FC = () => {
  const { data: hindiTop20PlaylistData } = useQuery(hindiTop20Playlist, {
    variables: { page: 1, limit: 10 },
  });

  const { data: englishTop20PlaylistData } = useQuery(englishTop20Playlist, {
    variables: { page: 2, limit: 10 },
  });
  const { data: punjabiTop20PlaylistData } = useQuery(punjabiTop20Playlist, {
    variables: { page: 3, limit: 10 },
  });
  
  return (
    <div>
      <Hero />
      <LayoutSidebar>
        <PopulerArtist />
        <SongPlaylist
          title="Hindi Top 20"
          playlistData={hindiTop20PlaylistData}
        />
        <SongPlaylist
          title="English Top 20"
          playlistData={englishTop20PlaylistData}
        />
        <SongPlaylist
          title="Punjabi Top 20"
          playlistData={punjabiTop20PlaylistData}
        />
        <Recommand />
      </LayoutSidebar> 
    </div>
  );
};

export default Home;
