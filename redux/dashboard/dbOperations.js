import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from 'toastify-react-native';
import { addPostToDB, 
    addCommentToPostInDB, 
    getAllPostsFromDB, 
    getAllCommentsToPostFromDB, 
    addLikeToPostInDB, 
    removeLikeToPostInDB, 
    getUsersPostsFromDB
} from '../../services/db';

export const addPost = createAsyncThunk(
    'db/addPost',
    async (data, { rejectWithValue }) => {
      try {
        const { userId, comments, likes, image, location,  coordinates, text } = data;
        const result = await addPostToDB({userId, comments, likes, image, location,  coordinates, text});
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
    async (setPosts, { rejectWithValue }) => {
      try {
        const result = await getAllPostsFromDB({setPosts:setPosts});
        return result;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const getUsersPosts = createAsyncThunk(
    'db/getUsersPosts',
    async (data, { rejectWithValue }) => {
      const {userId, setUsersPosts} = data
      try {
        const result = await getUsersPostsFromDB({userId:userId, setUsersPosts:setUsersPosts});
        return result;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const addComments = createAsyncThunk(
    'db/addComment',
    async (data, { rejectWithValue }) => {
     const {postId, commentData} = data
      try {
        await addCommentToPostInDB({postId, commentData:commentData});
        return 
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const getComments = createAsyncThunk(
    'db/getComments',
    async (data, { rejectWithValue }) => {
     const {postId, setComments} = data
      try {
        await getAllCommentsToPostFromDB({postId:postId, setComments:setComments});
        return 
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const addLike = createAsyncThunk(
    'db/addLike',
    async (data, { rejectWithValue }) => {
     const {postId} = data
      try {
        await addLikeToPostInDB({postId: postId});
        return 
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const removeLike = createAsyncThunk(
    'db/removeLike',
    async (data, { rejectWithValue }) => {
     const {postId} = data
      try {
        await removeLikeToPostInDB({postId: postId});
        return 
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );