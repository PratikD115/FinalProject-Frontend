import Layout from "@/components/layout/Layout";
import LayoutSidebar from "@/components/layout/LayoutSidebar";
import Browser from "@/page/Browser";
import Artist from "@/page/Browser";

export default function BrowserPage() {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ...">
      <Layout>
        <LayoutSidebar>
          <Browser />
        </LayoutSidebar>
      </Layout>
    </div>
  );
}
