import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaylistItem {
  // Define the properties of a playlist item here
}

interface PlaylistState {
  playlist: PlaylistItem[];
  index: number;
}

const initialPlaylistState: PlaylistState = { playlist: [], index: 0 };

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialPlaylistState,
  reducers: {
    setPlaylistAndIndex(state, action: PayloadAction<{ playlist: PlaylistItem[]; index: number }>) {
      state.playlist = action.payload.playlist;
      state.index = action.payload.index;
    },
    nextSong(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
  },
});

export const playlistActions = playlistSlice.actions;

export default playlistSlice.reducer;

