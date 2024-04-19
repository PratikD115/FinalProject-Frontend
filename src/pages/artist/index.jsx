import Layout from "@/components/layout/Layout";
import LayoutSidebar from "@/components/layout/LayoutSidebar";
import Artist from "@/page/Artist";

export default function ArtistPage() {
  return (
    
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ...">
        <Layout>
          <LayoutSidebar>
            <Artist />
          </LayoutSidebar>
        </Layout>
      </div>
  );
}
