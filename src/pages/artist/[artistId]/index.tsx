import React from "react";
import ArtistProfile from "../../../../components/page/ArtistProfile";

import Layout from "../../../../components/layout/Layout";

const ArtistProfilePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ... min-h-screen">
      <Layout>
        <ArtistProfile />
      </Layout>
    </div>
  );
};

export default ArtistProfilePage;
