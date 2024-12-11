// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const auth_token = localStorage.getItem('token');

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: auth_token || null // Reset token when user logs out
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserAuth: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true; // Update isAuthenticated based on user data
      state.isLoading = false;
      if(action.payload.token){
        localStorage.setItem('token',action.payload.token);
        state.token = action.payload.token; // Reset token when user logs out
      }
     
    },
    setLoading: (state, action) => {
        state.isLoading = action.payload;
    },
    resetUser: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null; // Reset token when user logs out
    },
  },
});

export const { setUserAuth,setUser, setLoading, resetUser } = userSlice.actions;
// export const selectUser = (state) => state.user.user;
// export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
// export const selectLoading = (state) => state.user.isLoading;
// export const selectError = (state) => state.user.error;

export default userSlice.reducer;