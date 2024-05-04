import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./playlistSlice";
import userReducer from "./userSlice";
import favouriteReducer from "./favoriteSlice";

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
    user: userReducer,
    favourite: favouriteReducer,
  },
});

export default store;
