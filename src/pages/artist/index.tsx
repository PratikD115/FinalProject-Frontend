import React from 'react';
import Layout from '../../../components/layout/Layout';
import LayoutSidebar from '../../../components/layout/LayoutSidebar';

const ArtistPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ...">
      <Layout>
        <LayoutSidebar>
        { <div>in the artist apge</div>}
        </LayoutSidebar>
      </Layout>
    </div>
  );
};

export default ArtistPage;
