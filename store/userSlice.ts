import { createSlice, PayloadAction, Unsubscribe } from "@reduxjs/toolkit";

interface User {
  role: string;
  profile: string;
}

interface UserState {
  user: User | null;
  isLogin: boolean;
  role: string | null;
  assignedToken: string | null;
  profile: any | null;
  subscribe: null | string;
  asArtist: null | string;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
  role: null,
  assignedToken: null,
  profile: null,
  subscribe: null,
  asArtist: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        user: User;
        token: any;
        subscribe: string;
        asArtist: string;
      }>
    ) {
      state.user = action.payload.user;
      state.isLogin = true;
      state.role = action.payload.user.role;
      state.assignedToken = action.payload.token;
      state.profile = action.payload.user.profile;
      state.subscribe = action.payload.subscribe;
      state.asArtist = action.payload.asArtist;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
      state.role = null;
      state.assignedToken = null;
      state.profile = null;
      state.subscribe = null;
      state.asArtist = null;
    },
    updateProfile(state, action: PayloadAction<{ imageLink: string }>) {
      state.profile = action.payload.imageLink;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
