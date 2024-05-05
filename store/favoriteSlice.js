import { createSlice } from "@reduxjs/toolkit";

const initialFavoriteState = { artistData: [], songData: [] };

const favouriteSlice = createSlice({
  name: "favorite",
  initialState: initialFavoriteState,
  reducers: {
    setArtistAndSong(state, action) {
      state.artistData = action.payload.artistData;
      state.songData = action.payload.songData;
    },
    setSongToData(state, action) {
      console.log(action.payload);
      state.songData.push(action.payload);
    },
    removeSongToData(state, action){
        
        state.songData = state.songData.filter(id => id !== action.payload);
    },
    setArtistToData(state, action) {
      
      state.artistData.push(action.payload)
    },
    removeArtistToData(state, action) {
      state.artistData = state.artistData.filter(id => id !== action.payload);
    }
  },
});

export const favouriteActions = favouriteSlice.actions;

export default favouriteSlice.reducer;
