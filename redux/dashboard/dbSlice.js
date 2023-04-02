import { createSlice } from '@reduxjs/toolkit';
import { addPost } from './dbOperations';

const pending = state => {
    state.isDataFetching = true;
  };
  const rejected = (state, { payload }) => {
    // console.log(payload);
    state.isDataFetching = false;
  };

  const initialState = {
    isDataFetching: false,
    posts: {},
  };

  export const dbSlice = createSlice({
    name: 'db',
    initialState,
    extraReducers: builder =>
      builder
        .addCase(addPost.fulfilled, (state, { payload }) => {
          console.log("payload post", payload);
        //   state.userData.uid=payload.uid
        //   state.userData.email = payload.email;
        //   state.userData.name = payload.displayName;
        //   state.userData.avatar = payload.photo;
    
          state.isDataFetching = false;
        }) 
    
    });
  
        export default dbSlice.reducer;