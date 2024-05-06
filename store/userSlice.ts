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
  expireDate: null | string;
  artistId: string | null;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
  role: null,
  assignedToken: null,
  profile: null,
  expireDate: null,
  artistId: null,
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
        expireDate: string;
        artistId: string;
      }>
    ) {
      console.log(action.payload.expireDate, action.payload.artistId);
      state.user = action.payload.user;
      state.isLogin = true;
      state.role = action.payload.user.role;
      state.assignedToken = action.payload.token;
      state.profile = action.payload.user.profile;
      state.expireDate = action.payload.expireDate;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
      state.role = null;
      state.assignedToken = null;
      state.profile = null;
      state.expireDate = null;
    },
    updateProfile(state, action: PayloadAction<{ imageLink: string }>) {
      state.profile = action.payload.imageLink;
    },
    subscribe(state, action: PayloadAction<{ expireDate: string }>) {
      state.expireDate = action.payload.expireDate;
    },
    unsubscribe(state) {
      state.expireDate = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
