import { gql } from "@apollo/client";

export const hindiTop20Playlist = gql`
  query ($page: Int!, $limit: Int!) {
    getAllActiveSongs(page: $page, limit: $limit) {
      id
      title
      imageLink
      streamingLink
      artist {
        id
        name
        imageLink
      }
    }
  }
`;

export const englishTop20Playlist = gql`
  query ($page: Int!, $limit: Int!) {
    getAllActiveSongs(page: $page, limit: $limit) {
      id
      title
      imageLink
      streamingLink
      artist {
        id
        name
        imageLink
      }
    }
  }
`;
export const punjabiTop20Playlist = gql`
  query ($page: Int!, $limit: Int!) {
    getAllActiveSongs(page: $page, limit: $limit) {
      id
      title
      imageLink
      streamingLink
      artist {
        id
        name
        imageLink
      }
    }
  }
`;

export const mostLikedSong = gql`
  query {
    mostLikedSong {
      id
      title
      artist {
        id
        name
      }

      imageLink
      streamingLink
    }
  }
`;

export const recommandedSongs = gql`
  query {
    getAllActiveSongs {
      id
      title
      imageLink
      streamingLink
      artist {
        id
        name
        imageLink
      }
    }
  }
`;

export const songDownload = gql`
  mutation ($url: String!) {
    downloadSong(url: $url)
  }
`;
export const createNewPlaylist = gql`
  mutation ($songId: String!, $playlistName: String!, $userId: String!) {
    createNewPlaylist(
      songId: $songId
      playlistName: $playlistName
      userId: $userId
    ) {
      id
    }
  }
`;

export const addSongToPlaylist = gql`
  mutation ($playlistId: String!, $songId: String!) {
    addSongToPlaylist(playlistId: $playlistId, songId: $songId) {
      id
    }
  }
`;

export const userPlaylist = gql`
  query ($userId: String!) {
    getUserById(userId: $userId) {
      playlist {
        id
        playlistName
        songs {
          title
          streamingLink
          imageLink
          id
          artist {
            name
          }
        }
      }
    }
  }
`;

export const deletePlaylist = gql`
  mutation ($playlistId: String!) {
    deletePlaylist(playlistId: $playlistId) {
      id
      playlistName
    }
  }
`;
