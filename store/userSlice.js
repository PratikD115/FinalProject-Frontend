const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  isLogin: false,
  role: null,
  assignedToken: null,
  profile: null
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLogin = true;
      state.role = action.payload.user.role;
      state.assignedToken = action.payload.token;
      
    },
    logout(state) {
      console.log('in the logout actions')
      state.user = null;
      state.isLogin = false;
      state.role = null;
      state.assignedToken = null;
     
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
