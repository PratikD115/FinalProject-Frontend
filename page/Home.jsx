import Hero from "../components/hero/Hero";
import New from "../components/hero/New";
import Recommand from "../components/hero/Recommand";
import LayoutSidebar from "../components/layout/LayoutSidebar";
import PopulerArtist from "../components/hero/PopulerArtist";

export default function Home() {
  return (
    <div>
      <Hero />
      <LayoutSidebar>
        <PopulerArtist />
       <New />
       <Recommand />
      </LayoutSidebar>      
    </div>
  );
}
