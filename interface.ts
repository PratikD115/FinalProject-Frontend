export interface Song {
  id: string;
  title: string;
  artist: Artist;
  genres: string[];
  isActive: boolean;
  likes: number;
  language: string;
  streamingLink: string;
  imageLink: string;
  mood: string[];
}

export interface Artist {
  id: string;
  name: string;
  language: string;
  isActive: boolean;
  imageLink: string;
  dateOfBirth: string;
  genres: string[];
  biography: string;
  songs: Song[] | [];
}
