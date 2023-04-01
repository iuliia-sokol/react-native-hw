import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from './authOperations';

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
    },
    stateChanged: false
  };

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder =>
      builder
        .addCase(signUp.fulfilled, (state, { payload }) => {
          console.log("payload register",payload);
          state.userData.uid=payload.uid
          state.userData.email = payload.email;
          state.userData.name = payload.displayName;
          state.userData.avatar = payload.photoURL;
          state.isLoggedIn = true;
          state.isUserFetching = false;
        })
        .addCase(signIn.fulfilled, (state, { payload }) => {
            console.log("payload login",payload);
          state.userData.uid=payload.uid
          state.userData.email = payload.email;
          state.userData.name = payload.displayName;
          state.userData.avatar = payload.photoURL;
          state.isLoggedIn = true;
          state.isUserFetching = false;
        })
        // .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        //   state.userData.name = payload.user.name;
        //   state.userData.avatar = payload.user.avatarURL;
        // })
        // .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        //   state.userData.name = payload.user.name;
        //   state.userData.avatar = payload.user.avatarURL;
        //   state.accessToken = payload.accessToken;
        //   state.isUserFetching = false;
        // })
        // .addCase(logOut.fulfilled, () => ({ ...initialState }))
  
        .addCase(signUp.pending, pending)
        .addCase(signIn.pending, pending)
        // .addCase(getCurrentUser.pending, pending)
  
        .addCase(signUp.rejected, rejected)

        // .addCase(getCurrentUser.rejected, () => ({ ...initialState }))
        .addCase(signIn.rejected, rejected),
  });
  
  export default authSlice.reducer;