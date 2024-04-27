import Layout from "@/components/layout/Layout";

export default function ArtistHome() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ">
        <Layout>
          <div className="flex justify-between items-center h-screen">
            <div className="w-3/5 text-center">
              <h1 className="text-4xl font-bold">
                Discover the perfect stage for your melodies
              </h1>
              <p className="text-lg">
                and the captivating resonance of your voice with our curated
                showcase for songs and podcasts.
              </p>
              <div className="mt-4">
                <a
                  href="#"
                  className="py-3 px-6 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600"
                >
                  Join Us
                </a>
              </div>
            </div>
            <div className="w-2/5">
              <Image
                src=""
                alt="Your Image"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </Layout>
      </div>
    );
}