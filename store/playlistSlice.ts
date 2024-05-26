import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  SongState } from "../interface";




interface UserPlaylist {
  playlist: SongState[];
  index: number;
}

const initialPlaylistState: UserPlaylist = { playlist: [], index: 0 };

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialPlaylistState,
  reducers: {
    setPlaylistAndIndex(
      state,
      action: PayloadAction<{ playlist: SongState[]; index: number }>
    ) {
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
