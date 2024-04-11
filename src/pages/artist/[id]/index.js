import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

const GET_DATA = gql`
  query {
    getArtistById(id: "660fb04b4ba102109bafb95e") {
      id
      name
      imageLink
      dateOfBirth
      nationality
      genres
      biography
      songs {
        id
        title
        genres
        language
        imageLink
      }
    }
  }
`;

export default function ArtistProfile() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="flex h-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ...">
      <div className="w-1/4 border-2 border-red-500">
        <Image src={data.imageLink} alt="ArtistProfile" />
        <div></div>
        <div></div>
        image name biography
      </div>
      <div className="w-3/4 border-2 border-red-500">
        song queue playbutton artist song nameplate artistsongs
      </div>
      similar artist footer
    </div>
  );
}
