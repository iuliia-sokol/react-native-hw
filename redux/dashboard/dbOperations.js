import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from 'toastify-react-native';
import { addPostToDB, getPostsFromDB } from '../../services/db';

export const addPost = createAsyncThunk(
    'db/addPost',
    async (data, { rejectWithValue }) => {
      try {
        const { userId, comments, likes, image, location,  coordinates, text } = data;

        const result = await addPostToDB({userId, comments, likes, image, location,  coordinates, text});
        // console.log('post', result);
        return result;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const getPosts = createAsyncThunk(
    'db/getPosts',
    async (_, { rejectWithValue }) => {
    
      try {
        const result = await getPostsFromDB();
        // console.log('all posts', result);
        return result;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );
