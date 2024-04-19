import { gql } from "@apollo/client";

export const searchSong = gql`
  query ($search: String!) {
    searchSong(search: $search) {
      id
      title
      genres
      isActive
      language
      streamingLink
      imageLink
      mood
      artist{
        name
      }
    }
  }
`;

export const searchArtist = gql`
  query ($search: String!) {
    searchArtist(search: $search) {
      id
      name
      language
      isActive
      imageLink
      dateOfBirth
      genres
      biography
    }
  }
`;
