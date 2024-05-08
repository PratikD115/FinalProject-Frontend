import { gql } from "@apollo/client";

interface Artist {
  id: string;
  name: string;
  imageLink: string;
  dateOfBirth: string;
  genres: string[];
  biography: string;
  songs: Song[];
}

interface Song {
  id: string;
  title: string;
  genres: string[];
  language: string;
  imageLink: string;
  streamingLink: string;
  artist: {
    name: string;
  };
}

interface ArtistData {
  getArtistById: Artist;
}

interface AllActiveArtistData {
  getAllActiveArtist: Artist[];
}

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

export const ArtistSong = gql`
  query ($id: String!) {
    getArtistById(id: $id) {
      songs(page: 1, limit: 100) {
        title
        genres
        id
        imageLink
        streamingLink
        language
        mood
        artist {
          name
        }
      }
    }
  }
`;

export const userToArtist = gql`
  mutation (
    $name: String!
    $userId: String!
    $dateOfBirth: String!
    $genres: [Genres!]!
    $language: language!
    $biography: String!
    $imageLink: String!
  ) {
    createUserToArtist(
      createUserToArtist: {
        name: $name
        userId: $userId
        dateOfBirth: $dateOfBirth
        genres: $genres
        language: $language
        biography: $biography
        imageLink: $imageLink
      }
    ) {
      id
      name
    }
  }
`;