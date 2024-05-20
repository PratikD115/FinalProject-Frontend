import Title from "../../../components/common/Title";
import Layout from "../../../components/layout/Layout";
const AboutUs: React.FC = () => (
  <Layout>
    <div className="flex flex-col  mt-5">
      <div className="flex justify-center">
        <Title title={"About Us"} />
      </div>
      <div className="px-40 py-10">
        <div className="text-xl text-white">
          Welcome to{" "}
          <span
            style={{ fontFamily: "Dancing Script" }}
            className="font-extrabold text-xl text-green-600"
          >
            MusicalMoment
          </span>{" "}
          Your Ultimate Music Destination!
        </div>
        <div className="mt-5 font-[lato] text-justify text-gray-300">
          At <strong>MusicalMoment</strong>, we believe in the power of music to
          inspire, uplift, and bring people together. Our mission is to provide
          you with an unparalleled music experience, whether you're a casual
          listener, a dedicated fan, or a music professional.
        </div>
        <div className="mt-10 text-2xl text-white">Who we are :</div>
        <div className="font=[lato] mt-2 text-justify text-gray-300">
          We are a passionate team of music enthusiasts, tech experts, and
          creative minds dedicated to bringing the best music to your
          fingertips. Our diverse backgrounds and shared love for music drive us
          to continuously innovate and improve our platform, ensuring that you
          have access to the latest hits, timeless classics, and everything in
          between.
        </div>
        <div className="mt-10 text-2xl text-white">What We Offer :</div>
        <div className="font=[lato] mt-2 text-justify text-gray-300 mb-10">
          Vast Music Library: <br />
          Explore millions of songs across various genres, from pop and rock to
          classical and jazz. Our extensive library is constantly updated with
          the latest releases and curated playlists.
        </div>
        <div className="font=[lato] mt-2 text-justify text-gray-300">
          Personalized Experience: <br />
          Our intelligent recommendation engine learns your music preferences
          and suggests songs, artists, and playlists tailored to your taste.
        </div>

        <div className="mt-10 text-2xl text-white">
          Join Us on Our Journey :
        </div>
        <div className="font=[lato] mt-2 text-justify text-gray-300">
          Whether you're discovering new artists, curating your perfect
          playlist, or simply enjoying your favorite tunes, [Your Website Name]
          is here to enhance your music experience. We are constantly evolving
          and expanding our features to ensure you have the best possible
          experience.
        </div>
        <div className="text-xl px-5 mt-10 text-green-500">
          Thank you for being a part of our community. Let the music play!
        </div>
      </div>
    </div>
  </Layout>
);

export default AboutUs;
