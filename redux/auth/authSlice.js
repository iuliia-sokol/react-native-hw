import { createSlice } from '@reduxjs/toolkit';
import { currentState, signIn, signOut, signUp } from './authOperations';

const pending = state => {
    state.isUserFetching = true;
  };
  const rejected = (state, { payload }) => {
    console.log(payload);
    state.isUserFetching = false;
    state.isLoggedIn = false;
  };

  const initialState = {
    isLoggedIn: false,
    isUserFetching: false,
    userData: {
      uid:null,
      email: null,
      name: null,
      avatar: null,
      posts: []
    },
  };

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder =>
      builder
        .addCase(signUp.fulfilled, (state, { payload }) => {
          state.userData.uid=payload.uid
          state.userData.email = payload.email;
          state.userData.name = payload.displayName;
          state.userData.avatar = payload.photo;
          state.isLoggedIn = true;
          state.isUserFetching = false;
        })
        .addCase(signIn.fulfilled, (state, { payload }) => {
          state.userData.uid=payload.uid
          state.userData.email = payload.email;
          state.userData.name = payload.displayName;
          state.userData.avatar = payload.photoURL;
          state.isLoggedIn = true;
          state.isUserFetching = false;
        })
        .addCase(currentState.fulfilled, (state, { payload }) => {
          state.userData.uid=payload.currentUser.uid
          state.userData.email = payload.currentUser.email;
          state.userData.name = payload.currentUser.displayName;
          state.userData.avatar = payload.currentUser.photo;
          state.isLoggedIn = payload.loggedIn;
        })
        .addCase(signOut.fulfilled, () => ({ ...initialState }))
        .addCase(signUp.pending, pending)
        .addCase(signIn.pending, pending)
  
        .addCase(signUp.rejected, rejected)
        .addCase(signIn.rejected, rejected),
  });
  
  export default authSlice.reducer;