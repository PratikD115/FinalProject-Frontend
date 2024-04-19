import { createSlice } from "@reduxjs/toolkit";

const initialPlaylistState = { playlist: [], index: 0 };

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialPlaylistState,
  reducers: {
    setPlaylistAndIndex(state, action) {
      state.playlist = action.payload.playlist;
      state.index = action.payload.index;
    },

    nextSong(state, action) {
      state.index = action.payload;
    },
  },
});

export const playlistActions = playlistSlice.actions;

export default playlistSlice.reducer;
