import { gql } from "@apollo/client";
export const hindiTop20Playlist = gql`
  query {
    getAllActiveSongs(page: 2, limit: 10) {
      id
      title
      duration
      imageLink
      streamingLink
      artist {
        id
        name
      }
    }
  }
`;

export const EnglishTop20Playlist = gql`
  query {
    getAllActiveSongs(page: 1, limit: 10) {
      id
      title
      duration
      imageLink
      streamingLink
      artist {
        id
        name
      }
    }
  }
`;
