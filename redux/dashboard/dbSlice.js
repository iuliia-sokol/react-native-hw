import { createSlice } from '@reduxjs/toolkit';
import { addPost, addComments, getPosts } from './dbOperations';

const initialState = {
    isDataFetching: false,
    posts: {},
  };

  const pending = state => {
    state.isDataFetching = true;
  };
  const rejected = (state, { payload }) => {
    initialState
  };

  export const dbSlice = createSlice({
    name: 'db',
    initialState,
    extraReducers: builder =>
      builder
        .addCase(addPost.fulfilled, (state, { payload }) => {
          state.posts=payload
          state.isDataFetching = false;
        })
        .addCase(addPost.pending, pending)
        .addCase(getPosts.pending, pending)
        .addCase(addComments.pending, pending)
        .addCase(getPosts.rejected, rejected)
        .addCase(getPosts.fulfilled, (state, { payload }) => {
            state.posts=payload
            state.isDataFetching = false;
          })
          .addCase(addComments.fulfilled, (state, { payload }) => {
            state.posts.comments=payload
            state.isDataFetching = false;
          })
        //   .addCase(getComments.fulfilled, (state, { payload }) => {
        //     state.comments=payload
        //     state.isDataFetching = false;
        //   })
    
    });
  
        export default dbSlice.reducer;