import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import dbSlice from './dashboard/dbSlice'


const rootReducer= combineReducers({
  auth: authSlice,
  db: dbSlice
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})