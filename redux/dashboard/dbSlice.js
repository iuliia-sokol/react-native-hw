import { createSlice } from '@reduxjs/toolkit';
import { addPost, addComments, getPosts, getComments, addLike, removeLike } from './dbOperations';

const initialState = {
    isDataFetching: false,
  };

  const pending = state => {
    state.isDataFetching = true;
  };
  const rejected = () => {
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
        .addCase(getPosts.fulfilled, (state, { payload }) => {
            state.posts=payload
            state.isDataFetching = false;
          })
          .addCase(addComments.fulfilled, (state) => {
            state.isDataFetching = false;
          })
          .addCase(getComments.fulfilled, (state) => {
            state.isDataFetching = false;
          })
          .addCase(addLike.fulfilled, (state) => {
            state.isDataFetching = false;
          })
          .addCase(removeLike.fulfilled, (state) => {
            state.isDataFetching = false;
          })
          .addCase(addPost.pending, pending)
          .addCase(getPosts.pending, pending)
          .addCase(addComments.pending, pending)
          .addCase(getComments.pending, pending)
          .addCase(addLike.pending, pending)
          .addCase(removeLike.pending, pending)
          .addCase(addPost.rejected, rejected)
          .addCase(getPosts.rejected, rejected)
          .addCase(addComments.rejected, rejected)
          .addCase(getComments.rejected, rejected)
          .addCase(addLike.rejected, rejected)
          .addCase(removeLike.rejected, rejected)

    });
  
        export default dbSlice.reducer;