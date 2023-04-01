import { createAsyncThunk } from '@reduxjs/toolkit';
import { Toast } from 'toastify-react-native';
import { authStateChanged, getCurrentUserInfo, loginDB, registerDB } from '../../services/auth';



export const signUp = createAsyncThunk(
    'auth/signup',
    async (user, { rejectWithValue }) => {
        // console.log('user', user);
      try {
        const { login, email, password } = user;
        const result = await registerDB({email: email,password: password, displayName:login});
        // console.log('register', result);
        return result.multiFactor.user;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const signIn = createAsyncThunk(
    'auth/signin',
    async (user, { rejectWithValue }) => {
        //  console.log('user', user);
      try {
        const { email, password } = user;
        const result = await loginDB({ email: email, password:password});
        console.log('login', result);
        return result.multiFactor.user;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const currentUser = createAsyncThunk(
    'auth/currentUser',
    async (_, { rejectWithValue }) => {
      try {
        const result = await getCurrentUserInfo();
        console.log('current', result);
        return result;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );

  export const currentState = createAsyncThunk(
    'auth/currentState',
    async (_, { rejectWithValue }) => {
      try {
        const result = await authStateChanged();
        console.log('state', result);
        return result;
      } catch (error) {
        console.dir({error})
        Toast.error(`${error.code}`);
        return rejectWithValue(error);
      }
    }
  );