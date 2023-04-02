import { createSlice } from '@reduxjs/toolkit';
import { addPost, getPosts } from './dbOperations';

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
        .addCase(getPosts.rejected, rejected)
        .addCase(getPosts.fulfilled, (state, { payload }) => {
            state.posts=payload
            state.isDataFetching = false;
          }) 
    
    });
  
        export default dbSlice.reducer;