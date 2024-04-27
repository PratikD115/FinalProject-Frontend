import { gql } from "@apollo/client";

export const addToFavourite = gql`
  mutation ($userId: String!, $songId: String!) {
    addToFavourite(addSongToFavourite: { userId: $userId, songId: $songId }) {
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

export const uploadImageQuery = gql`
  mutation ($userId: String!, $image: Upload!) {
    uploadImage(image: $image, userId: $userId) {
      id
      name
      email
      password
      role
      favourite {
        id
        title
        genres
      }
      playlist {
        id
        playlistName
      }
      profile
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
      profile
    }
  }
`;
