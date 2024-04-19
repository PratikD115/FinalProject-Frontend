import { configureStore } from "@reduxjs/toolkit";
import  playlistReducer  from "./playlistSlice";
import  userReducer   from "./userSlice";

const store = configureStore({
  reducer: { playlist: playlistReducer, user: userReducer },
});

export default store;