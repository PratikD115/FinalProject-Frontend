import Info from "../components/footer/Info";
import Hero from "../components/hero/Hero";
import New from "../components/hero/New";
import Recommand from "../components/hero/Recommand";
import Treading from "../components/hero/Treading";
import LayoutSidebar from "../components/layout/LayoutSidebar";

export default function Home() {
  return (
    <div>
      <Hero />
      <LayoutSidebar>
        <Treading />
        <New />
        <Recommand />
      </LayoutSidebar>
      <Info />
    </div>
  );
}
