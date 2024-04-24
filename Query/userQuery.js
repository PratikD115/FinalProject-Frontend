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

export const uploadProfile = gql`
  mutation ($image: Upload!, $userId: String!) {
    uploadImage(image: $image, userId: $userId) {
      id
    }
  }
`;
