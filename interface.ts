export interface UserState {
  id: string;
  name: string;
  email: string;
  password: string;
  favourite: SongState[];
  follow: ArtistState[];
  playlist: PlaylistState[];
  role: string;
  profile: string;
  artistId: ArtistState;
  subscribe: string;
}

export interface SongState {
  id: string;
  title: string;
  artist: ArtistState;
  genres: string[];
  language: string;
  streamingLink: string;
  imageLink: string;
  mood: string[];
  isActive: boolean;
  likes: number;
}

export interface ArtistState {
  id: string;
  name: string;
  imageLink: string;
  dateOfBirth: string;
  genres: string[];
  biography: string;
  songs: SongState[];
  isActive: boolean;
  language: string;
  follower: UserState[];
}

export interface PlaylistState {
  id: string;
  playlistName: string;
  user: UserState;
  songs: SongState[];
}
