import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface FavoriteState {
  artistData: string [];
  songData: string[];
}

const initialFavoriteState: FavoriteState = { artistData: [], songData: [] };

const favouriteSlice = createSlice({
  name: "favorite",
  initialState: initialFavoriteState,
  reducers: {
    setArtistAndSong(state, action: PayloadAction<{ artistData: string[]; songData: string[] }>) {
      state.artistData = action.payload.artistData;
      state.songData = action.payload.songData;
    },
    setSongToData(state, action: PayloadAction<string>) {
      state.songData.push(action.payload);
    },
    removeSongToData(state, action: PayloadAction<string>) {
      state.songData = state.songData.filter(song => song!== action.payload);
    },
    setArtistToData(state, action: PayloadAction<string>) {
      state.artistData.push(action.payload);
    },
    removeArtistToData(state, action: PayloadAction<string>) {
      state.artistData = state.artistData.filter(artist => artist !== action.payload);
    }
  },
});

export const favouriteActions = favouriteSlice.actions;

export default favouriteSlice.reducer;

