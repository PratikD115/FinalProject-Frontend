import { gql } from "@apollo/client";

export const createSongLink = gql`
  mutation (
    $title: String!
    $artist: String!
    $genres: [Genres!]!
    $language: Language!
    $mood: [SongMood!]!
    $streamingLink: String!
    $imageLink: String!
  ) {
    createSongLink(
      createSongLinkDto: {
        title: $title
        artist: $artist
        genres: $genres
        language: $language
        mood: $mood
        streamingLink: $streamingLink
        imageLink: $imageLink
      }
    ) {
      id
      title
    }
  }
`;
