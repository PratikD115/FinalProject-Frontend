import Hero from "../components/hero/Hero";
import Recommand from "../components/hero/Recommand";
import LayoutSidebar from "../components/layout/LayoutSidebar";
import PopulerArtist from "../components/hero/PopulerArtist";
import { EnglishTop20Playlist, hindiTop20Playlist } from "@/Query/playlistQuery";
import SongPlaylist from "../components/hero/SongPlaylist";


export default function Home() {
  return (
    <div>
      <Hero />
      <LayoutSidebar>
       <PopulerArtist />
        <SongPlaylist title="Hindi Top 20" query={hindiTop20Playlist} />
        <SongPlaylist title="English Top 20" query={EnglishTop20Playlist} />
       <Recommand />
      </LayoutSidebar>      
    </div>
  );
}
