import { gql } from "@apollo/client";

export const addToFavourite = gql`
  mutation ($userId: String!, $songId: String!) {
    addToFavourite(addSongToFavourite: { userId: $userId, songId: $songId }) {
      id
      name
    }
  }
`;

export const removeToFavourite = gql`
  mutation ($userId: String!, $songId: String!) {
    removeToFavourite(
      removeSongToFavourite: { userId: $userId, songId: $songId }
    ) {
      id
      name
    }
  }
`;

export const getAllPlaylist = gql`
  query ($userId: String!) {
    getUserById(userId: $userId) {
      playlist {
        id
        playlistName
      }
    }
  }
`;

export const userInfo = gql`
  query ($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      email
      password
      role
      profile
      favourite {
        id
        title
        imageLink
        streamingLink

        artist {
          name
        }
      }
      playlist {
        id
        playlistName
      }
      follow {
        id
        name
        imageLink
      }
    }
  }
`;

export const addArtist = gql`
  mutation ($userId: String!, $artistId: String!) {
    addArtistToUser(userId: $userId, artistId: $artistId) {
      id
      name
      email
      password
      role
      follow {
        id
        name
        language
      }
      profile
    }
  }
`;

export const removeArtist = gql`
  mutation ($userId: String!, $artistId: String!) {
    removeArtistToUser(userId: $userId, artistId: $artistId) {
      id
      name
      email
      role
      follow {
        id
        name
      }
      profile
    }
  }
`;

export const uploadImage = gql`
  mutation ($imageLink: String!, $userId: String!) {
    storeImageLink(imageLink: $imageLink, userId: $userId) {
      id
      name
      email
    }
  }
`;
