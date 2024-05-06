import { createSlice, PayloadAction, Unsubscribe } from "@reduxjs/toolkit";

interface User {
  role: string;
}

interface UserState {
  user: User | null;
  isLogin: boolean;
  role: string | null;
  assignedToken: string | null;
  profile: any | null;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
  role: null,
  assignedToken: null,
  profile: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; authCookie: any }>) {
      state.user = action.payload.user;
      state.isLogin = true;
      state.role = action.payload.user.role;
      state.assignedToken = action.payload.authCookie;
    },
    logout(state) {
      state.user = null;
      state.isLogin = false;
      state.role = null;
      state.assignedToken = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
