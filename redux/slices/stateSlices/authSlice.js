import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false, token: "", user: null },
  reducers: {
    loginSlice(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.user = null;
    },
  },
});

export const { loginSlice, logout } = authSlice.actions; 
export default authSlice.reducer;
