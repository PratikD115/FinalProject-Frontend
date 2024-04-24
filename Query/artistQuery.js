import { gql } from "@apollo/client";

export const ARTIST = gql`
  query ($id: String!, $page: Float!, $limit: Float!) {
    getArtistById(id: $id) {
      id
      name
      imageLink
      dateOfBirth
      genres
      biography
      songs(page: $page, limit: $limit) {
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

export const GET_DATA = gql`
  query {
    getAllActiveArtist {
      id
      name
      imageLink
      dateOfBirth
    }
  }
`;
