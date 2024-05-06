import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playlistReducer from "./playlistSlice";
import userReducer from "./userSlice";
import favouriteReducer from "./favoriteSlice";

const rootReducer = combineReducers({
  playlist: playlistReducer,
  user: userReducer,
  favourite: favouriteReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
