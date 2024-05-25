import Playlist from "../../../components/page/Playlist";
import Layout from "../../../components/layout/Layout";

const PlaylistPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ...">
      <Layout>
        <Playlist />
      </Layout>
    </div>
  );
};

export default PlaylistPage;
