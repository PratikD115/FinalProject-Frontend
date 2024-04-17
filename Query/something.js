import { gql } from "@apollo/client";
export const ARTIST = gql`
  query ($id: String!) {
    getArtistById(id: $id) {
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
        streamingLink
        artist {
          name
        }
      }
    }
  }
`;
