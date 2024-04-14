import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { playlist: [], index: 0 };

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setPlaylistAndIndex(state, action) {
      state.playlist = action.payload.playlist
      state.index = action.payload.index
    },
    
    nextSong(state, action) {
      state.index = action.payload
    }
  },
});

const store = configureStore({
  reducer: playlistSlice.reducer,
});

export const playlistActions = playlistSlice.actions;

export default store;
